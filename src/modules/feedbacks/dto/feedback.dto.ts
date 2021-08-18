import { ApiProperty } from "@nestjs/swagger";
export class FeedbackDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly feedback: number;
    @ApiProperty()
    readonly dismissed: boolean;
}