import { RouteDay } from './route-day.entity';
import { ROUTEDAYS_REPOSITORY } from '../../core/constants';

export const routeDaysProviders= [{
    provide: ROUTEDAYS_REPOSITORY,
    useValue: RouteDay,
}];