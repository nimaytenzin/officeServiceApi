import { ApiProperty } from "@nestjs/swagger";
export class DivisionDTO {
    @ApiProperty()
    readonly name: string;
    readonly description: string;
    readonly vision: string;
    readonly mission: string;
}