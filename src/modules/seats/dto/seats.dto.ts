import { ApiProperty } from "@nestjs/swagger";
export class SeatsDto {
    @ApiProperty()
    readonly busId: number;
    @ApiProperty()
    readonly seatNumber: number;
    @ApiProperty()
    readonly status: string;
    @ApiProperty()
    readonly type: string;

}