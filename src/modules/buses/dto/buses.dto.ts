import { ApiProperty } from "@nestjs/swagger";
export class BusDto {
    @ApiProperty()
    readonly vechileNumber: string;
    @ApiProperty()
    readonly typeId: number;

}