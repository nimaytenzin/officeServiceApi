import { SEATS_REPOSITORY } from "src/core/constants";
import { Seats } from "./seats.entity";


export const SeatsProviders = [{
    provide: SEATS_REPOSITORY,
    useValue: Seats,
}];