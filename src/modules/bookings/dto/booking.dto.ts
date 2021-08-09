export class BookingDto {
    readonly scheduleId: number;
    readonly bookingTime: Date;
    readonly customerName: string;
    readonly customerContact: number;
    readonly customerCid: string;
    readonly paymentStatus: string;
    readonly checkInStatus: string;
    readonly checkSum: string;
    readonly busId: number;
    readonly amount: number;
    readonly operatorId: number;
    readonly seats:number [] 
}

