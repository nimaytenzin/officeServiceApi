import { Staff } from './staff.entity';
import { STAFF_REPOSITORY } from '../../core/constants';

export const staffProviders = [{
    provide: STAFF_REPOSITORY,
    useValue: Staff,
}];