import { ApiProperty} from "@nestjs/swagger";
export class LogInUserDto {
   
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly password: string;
}