import { ApiProperty } from "@nestjs/swagger";
export class BookedSeatsDto{
    @ApiProperty()
    readonly seatId: number;
    @ApiProperty()
    readonly bookingId: number;
}