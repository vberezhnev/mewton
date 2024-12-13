import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BoostsController } from './boosts.controller';
import { BoostsService } from './boosts.service';

@Module({
  controllers: [BoostsController],
  providers: [BoostsService, JwtService],
})
export class BoostsModule {}
