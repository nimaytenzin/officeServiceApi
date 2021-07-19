import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { InvoiceDto } from './dto/invoice.dto';
import { Invoice } from './invoice.entity';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
    constructor(private invoiceService: InvoicesService){}

    @Post()
    async create(@Body() invoices: InvoiceDto){
        return await this.invoiceService.create(invoices);
    }

    @Get(':id')
    async findOneById(@Param('id') id:number){
        return await this.invoiceService.findOneById(id);
    }

    @Get('/booking-id/:id')
    async findOneByBookingId(@Param('id') id:number){
        return await this.invoiceService.findOneByBookingId(id);
    }

    @Put(':id')
    async update(@Param('id') id: number,@Body() invoices: InvoiceDto){
        const { numRows, num} = await this.invoiceService.update(id, invoices);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }

    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.invoiceService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
