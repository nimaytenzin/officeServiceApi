import { ApiProperty} from "@nestjs/swagger";

export class RouteDayDto {
    @ApiProperty()
    readonly routeId: number;

    @ApiProperty()
    readonly day: number;
}