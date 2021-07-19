import { ApiProperty } from "@nestjs/swagger";
export class BusTypeDto {
    @ApiProperty()
    readonly busId: number;
    @ApiProperty()
    readonly type: string;
    @ApiProperty()
    readonly capacity: number;

}