import { Controller, Get, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Get()
    async getWallets() {
        return await this.walletService.getWallets();
    }

    @Get('info')
    async getWalletInfo(@Query('name') walletAppName: string) {
        return await this.walletService.getWalletInfo(walletAppName);
    }
}
