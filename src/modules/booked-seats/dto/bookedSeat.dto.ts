import { ApiProperty } from "@nestjs/swagger";
export class BookedSeatsDto{
    @ApiProperty()
    readonly seatNumber: number;
    @ApiProperty()
    readonly bookingId: number;
    @ApiProperty()
    readonly scheduleId: number;
}