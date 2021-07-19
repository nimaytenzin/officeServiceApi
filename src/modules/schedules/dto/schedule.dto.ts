import { ApiProperty} from "@nestjs/swagger";
export class ScheduleDto {
    @ApiProperty()
    readonly busId: number;
    @ApiProperty()
    readonly originId: number;
    @ApiProperty()
    readonly destinationId: number;
    @ApiProperty()
    readonly ETA: Date;
    @ApiProperty()
    readonly departureTime: Date;
}