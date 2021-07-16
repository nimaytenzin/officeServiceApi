export class ScheduleDto {
    readonly busId: number;
    readonly originId: number;
    readonly destinationId: number;
    readonly ETA: Date;
    readonly departureTime: Date;
}