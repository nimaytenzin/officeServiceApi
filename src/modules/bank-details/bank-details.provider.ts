import { BANKDETAILS_REPOSITORY} from "src/core/constants";
import { BankDetail } from "./bank-details.entity";


export const BankDetailsProvider = [{
    provide: BANKDETAILS_REPOSITORY,
    useValue: BankDetail,
}];