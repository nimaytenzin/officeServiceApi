export class InvoiceDto {
    readonly bookingId: number;
    readonly txnTime: Date;
    readonly amount: number;
    readonly paymentStatus: string;
}