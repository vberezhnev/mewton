import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
  controllers: [WalletController], // Регистрация контроллера
  providers: [WalletService],      // Регистрация сервиса
  exports: [WalletService],        // Экспорт сервиса, если он понадобится в других модулях
})
export class WalletModule {}
