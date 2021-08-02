import { ApiProperty} from "@nestjs/swagger";
export class UserDto {
    @ApiProperty()
    readonly id: string;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly role: number;
}