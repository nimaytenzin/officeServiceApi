import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { invoiceProviders } from './invoices.providers';

@Module({
  providers: [InvoicesService,...invoiceProviders],
  exports:[InvoicesService],
  controllers: [InvoicesController]
})
export class InvoicesModule {}
