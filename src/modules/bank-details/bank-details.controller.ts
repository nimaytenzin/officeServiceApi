import { Controller, Get } from '@nestjs/common';
import { BankDetail} from './bank-details.entity'
import {BankDetailsService} from './bank-details.service'


@Controller('bank-details')
export class BankDetailsController {
    constructor(
        private bankdetailsService: BankDetailsService
    ) { }
    @Get()
    async getBankDetail():Promise<BankDetail>{
        return await this.bankdetailsService.findFirst()
    }
}
