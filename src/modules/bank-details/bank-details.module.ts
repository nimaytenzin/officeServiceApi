import { Module } from '@nestjs/common';
import { BankDetailsService } from './bank-details.service';
import { BankDetailsController } from './bank-details.controller';
import { BankDetailsProvider } from './bank-details.provider';

@Module({
  providers: [BankDetailsService,...BankDetailsProvider],
  controllers: [BankDetailsController],
  exports:[BankDetailsService]
})
export class BankDetailsModule {}
