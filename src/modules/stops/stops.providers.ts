import { STOPS_REPOSITORY } from "src/core/constants";
import { Stop } from './stop.entity';



export const StopsProviders = [{
    provide: STOPS_REPOSITORY,
    useValue: Stop,
}];