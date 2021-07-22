import { Route } from './route.entity';
import { ROUTES_REPOSITORY } from '../../core/constants';

export const routesProviders= [{
    provide: ROUTES_REPOSITORY,
    useValue: Route,
}];