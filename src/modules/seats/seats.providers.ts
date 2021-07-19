import { SEATS_REPOSITORY } from "src/core/constants";
import { Seat } from "./seat.entity";


export const SeatsProviders = [{
    provide: SEATS_REPOSITORY,
    useValue: Seat,
}];