import { BusType } from './busType.entity';
import { BUSTYPES_REPOSITORY } from '../../core/constants';

export const busTypesProviders = [{
    provide: BUSTYPES_REPOSITORY,
    useValue: BusType,
}];