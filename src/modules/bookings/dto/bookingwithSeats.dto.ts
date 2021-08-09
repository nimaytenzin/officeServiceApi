import { BookingDto } from './booking.dto'
export class BookingWithSeatsDto {
    readonly booking : BookingDto;
    readonly seats: number []
}