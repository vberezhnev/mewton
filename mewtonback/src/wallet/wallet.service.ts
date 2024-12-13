import { Injectable } from '@nestjs/common';
import { WalletsListManager, isWalletInfoRemote, WalletInfoRemote } from '@tonconnect/sdk';

@Injectable()
export class WalletService {
    private walletsListManager = new WalletsListManager({
        cacheTTLMs: Number(process.env.WALLETS_LIST_CACHE_TTL_MS || 60000),
    });

    async getWallets(): Promise<WalletInfoRemote[]> {
        const wallets = await this.walletsListManager.getWallets();
        return wallets.filter(isWalletInfoRemote);
    }

    async getWalletInfo(walletAppName: string): Promise<WalletInfoRemote | undefined> {
        const wallets = await this.getWallets();
        return wallets.find(wallet => wallet.appName.toLowerCase() === walletAppName.toLowerCase());
    }
}
