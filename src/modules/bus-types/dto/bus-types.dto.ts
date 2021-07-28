import { ApiProperty } from "@nestjs/swagger";
export class BusTypeDto {
    @ApiProperty()
    readonly type: string;
    @ApiProperty()
    readonly make: number;
    @ApiProperty()
    readonly model: number;
    @ApiProperty()
    readonly capacity: number;

}