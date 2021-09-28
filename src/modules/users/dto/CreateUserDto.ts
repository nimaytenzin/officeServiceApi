import { ApiProperty} from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly email: string;
   
    @ApiProperty()
    readonly contact: string;
    @ApiProperty()
    readonly ext_no: string;
    @ApiProperty()
    readonly emp_id: string;
    @ApiProperty()
    readonly cid: number;
    @ApiProperty()
    readonly position: string;
    @ApiProperty()
    readonly designation: string;
    @ApiProperty()
    readonly profile_uri: string;
    @ApiProperty()
    readonly signature_uri: number;

    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly role: number;

    
}