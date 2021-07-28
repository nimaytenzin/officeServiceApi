import { ApiProperty} from "@nestjs/swagger";
export class ScheduleDayDto {
    @ApiProperty()
    readonly routeId: number;

    @ApiProperty()
    readonly onDays: number[];

    @ApiProperty()
    readonly fromDate: Date;

    @ApiProperty()
    readonly toDate: Date;

}