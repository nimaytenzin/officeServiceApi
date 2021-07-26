import { ApiProperty} from "@nestjs/swagger";
export class ScheduleDto {
    @ApiProperty()
    readonly busId: number;

    @ApiProperty()
    readonly routeId: number;

    @ApiProperty()
    readonly dateId: number;

    @ApiProperty()
    readonly isFinished: number;
}