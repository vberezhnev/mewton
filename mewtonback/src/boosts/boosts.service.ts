import { Injectable } from '@nestjs/common';
import { Boost } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoostsService {
  constructor(private prisma: PrismaService) {}

  async buyBoost(id: number, userId: number) {
    const boost = await this.prisma.boost.findUnique({ where: { id } });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!boost) {
      throw new Error('Boost not found');
    }

    if (boost.name === 'Loki') {
      if (user.points < boost.buyPrice) {
        throw new Error('Insufficient points');
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          catsBought: { increment: 1 },
          points: { decrement: boost.buyPrice },
        },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          totalEarned: { increment: boost.boostPrice },
        },
      });

      const boosts = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { boosts: true },
      });

      return boosts;
    }

    if (user.balance < boost.buyPrice) {
      throw new Error('Insufficient balance');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        catsBought: { increment: 1 },
        balance: { decrement: boost.buyPrice },
        boosts: { update: { where: { id }, data: { boostLastBuyDate: new Date() } } },
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalEarned: { increment: boost.boostPrice },
      },
    });

    const boosts = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { boosts: true },
    });

    return boosts;
  }

  async updateBoost(id: number, data: Boost) {
    const boost = await this.prisma.boost.update({ where: { id }, data });
    return boost;
  }

  async getAllBoosts(userid: number) {
    const boosts = await this.prisma.boost.findMany();
    return boosts;
  }

  async getAllUserBoosts(userid: number) {
    const boosts = await this.prisma.user.findUnique({
      where: { id: userid },
      select: { boosts: true },
    });
    return boosts;
  }
}
