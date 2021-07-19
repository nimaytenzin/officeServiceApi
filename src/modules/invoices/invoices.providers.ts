import { Invoice } from './invoice.entity';
import { INVOICES_REPOSITORY} from '../../core/constants';

export const invoiceProviders= [{
    provide: INVOICES_REPOSITORY,
    useValue: Invoice,
}];