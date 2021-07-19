import { ApiProperty } from "@nestjs/swagger";
export class InvoiceDto {
    @ApiProperty()
    readonly bookingId: number;
    @ApiProperty()
    readonly txnTime: Date;
    @ApiProperty()
    readonly amount: number;
    @ApiProperty()
    readonly paymentStatus: string;
}