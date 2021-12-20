import { ApiProperty } from "@nestjs/swagger";
export class DepartmentDTO {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly description: string;
    
   
    @ApiProperty()
    readonly vision: string;
    
    @ApiProperty()
    readonly mission: string;
}