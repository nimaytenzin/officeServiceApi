import { ApiProperty} from "@nestjs/swagger";

export class RouteDto {
    @ApiProperty()
    readonly originId: number;

    @ApiProperty()
    readonly destinationId: number;
    
    @ApiProperty()
    readonly departureTime: string;

    @ApiProperty()
    readonly ETA: string;

    @ApiProperty()
    readonly fare: number;

    @ApiProperty()
    readonly days: number[];
}