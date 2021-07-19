import { Inject, Injectable } from '@nestjs/common';
import { INVOICES_REPOSITORY } from 'src/core/constants';
import { InvoiceDto } from './dto/invoice.dto';
import { Invoice } from './invoice.entity';

@Injectable()
export class InvoicesService {
    constructor(@Inject(INVOICES_REPOSITORY) private readonly invoicesRepository: typeof Invoice){}

    async create(invoice: InvoiceDto): Promise<Invoice>{
        return await this.invoicesRepository.create<Invoice>(invoice);
    }
    async findOneById(id: number): Promise<Invoice>{
        return this.invoicesRepository.findOne<Invoice>({ 
            where:{id} 
        });
    }
    async findOneByBookingId(id: number): Promise<Invoice>{
        return this.invoicesRepository.findOne<Invoice>({ 
            where:{bookingId: id} 
        });
    }
    async update(id,data){
        const [numRows,num] = await this.invoicesRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.invoicesRepository.destroy({ where: { id } });
    }


}
