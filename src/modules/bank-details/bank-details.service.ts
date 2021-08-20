import { Inject, Injectable } from '@nestjs/common';
import { BANKDETAILS_REPOSITORY } from '../../core/constants'
import { BankDetail} from './bank-details.entity'

@Injectable()
export class BankDetailsService {

    constructor(@Inject(BANKDETAILS_REPOSITORY) private readonly bankdetails_repository: typeof BankDetail) { }

    async findFirst(): Promise<BankDetail> {
        return await this.bankdetails_repository.findOne({
            where:{
                id:1
            }
        })
    }
}
