import { Bus } from './buses.entity';
import { BUSES_REPOSITORY } from '../../core/constants';

export const busesProviders = [{
    provide: BUSES_REPOSITORY,
    useValue: Bus,
}];