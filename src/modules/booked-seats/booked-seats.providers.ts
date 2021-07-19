import { BOOKEDSEATS_REPOSITORY} from "src/core/constants";
import { BookedSeat } from "./booked-seats.entity";


export const BookedSeatsProviders = [{
    provide: BOOKEDSEATS_REPOSITORY,
    useValue: BookedSeat,
}];