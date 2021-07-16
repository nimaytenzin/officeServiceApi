export class BookingDto {
    readonly scheduleId: number;
    readonly bookingTime: Date;
    readonly customerContact: number;
    readonly paymentStatus: string;
    readonly checkInStatus: string;
    readonly checkSum: string;
    readonly busId: number;
    readonly amount: number;
    readonly customerName: string;
    readonly operatorId: number;
}