import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { BookingWithSeatsDto } from './dto/bookingwithSeats.dto'
import { BookingDto } from './dto/booking.dto'
import { BookingsService } from "./bookings.service"
import {Booking } from './booking.entity'
import { ConfirmDto } from './dto/confrim.dto';
import { threadId } from 'worker_threads';
@Controller('bookings')
export class BookingsController {

    constructor(
        private bookingService: BookingsService
    ) { }

    @Post()
    async create(@Body() bookingWithSeats: BookingWithSeatsDto) {
        return await this.bookingService.create(bookingWithSeats);

    }

    @Post("confirmbooking")
    async confrimBooking(@Res() res,@Body() confirmObject: ConfirmDto) {
        if(confirmObject.bfs_debitAuthCode == "00"){
            let updateObject = {
                paymentStatus:"PAID"
            }
            const {numRows,num}= await this.bookingService.updateOnlyBooking(Number(confirmObject.bfs_orderNo),updateObject);

            if( numRows > 0 ){
                const booking = await this.bookingService.findOneById(Number(confirmObject.bfs_orderNo));
                if(booking !== null){
                    const bookedSeats = booking.bookedSeats;
                    for (var i = 0; i < bookedSeats.length; i++){
                        console.log(bookedSeats[i].seatNumber)
                        await this.bookingService.publishBooking(booking.scheduleId.toString(),bookedSeats[i].seatNumber.toString())
                    }
                    // await this.bookingService.publishBooking(booking.scheduleId,)
                    // return res.status(200).send("OK")
                    return res.status(200).redirect(`http://localhost:8080/book/eticket/${confirmObject.bfs_orderNo}`)
                }
            }
        }
        //TODO: handle unsuccessful payment here
        return res.status(400).send("NOT OK")

    }
    @Get('checksum/:bookingId')
    async getChecksum(@Param('bookingId') bookingId:number){
        return await this.bookingService.generateChecksum(bookingId)
    }

    @Get()
    async getAll():Promise<Booking[]>{
        return await this.bookingService.findAll();
    }

    @Get('scheduleId/:id')
    async GetCheckout(@Param('id') id):Promise<Booking[]>{
        return await this.bookingService.findAllCheckoutBySchedule(id);
    }

    @Get('cancelled')
    async findAll():Promise<Booking[]>{
        return await this.bookingService.findAllCancelled();
    }


    @Get(':id')
    async findOne(@Param('id')id: number):Promise<Booking>{
        return await this.bookingService.findOneById(id);
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() booking: BookingDto) {
        const { numRows, num} = await this.bookingService.update(id, booking);

        console.log("Updating without deleting")
        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'updated sccuessfully';
    }

    @Put('cancel/:id')
    async cancel(@Param('id')id: number, @Body() booking: BookingDto) {
        const { numRows, num} = await this.bookingService.cancelBooking(id, booking);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'updated sccuessfully';
    }

    @Put('transfer/:id')
    async transfer(@Param('id')id: number, @Body() booking: BookingDto) {
        const { numRows, num} = await this.bookingService.transferBooking(id, booking);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'updated sccuessfully';
    }

}
