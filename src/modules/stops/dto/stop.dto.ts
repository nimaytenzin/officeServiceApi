import { ApiProperty } from "@nestjs/swagger";
export class StopDto {
    @ApiProperty()
    readonly name: string;
}