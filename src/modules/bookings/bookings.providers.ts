import { Booking } from './booking.entity';
import { BOOKING_REPOSITORY } from '../../core/constants';

export const bookingProviders = [{
    provide: BOOKING_REPOSITORY,
    useValue: Booking,
}];