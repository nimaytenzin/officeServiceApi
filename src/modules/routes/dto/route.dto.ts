import { ApiProperty} from "@nestjs/swagger";

export class RouteDto {
    @ApiProperty()
    readonly originId: number;

    @ApiProperty()
    readonly destinationId: number;
    
    @ApiProperty()
    readonly departureTime: Date;

    @ApiProperty()
    readonly ETA: Date;

    @ApiProperty()
    readonly fare: number;
}