import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BookingWithSeatsDto } from './dto/bookingwithSeats.dto'
import { BookingDto } from './dto/booking.dto'
import { BookingsService } from "./bookings.service"
import {Booking } from './booking.entity'
@Controller('bookings')
export class BookingsController {

    constructor(
        private bookingService: BookingsService
    ) { }

    @Post()
    async create(@Body() bookingWithSeats: BookingWithSeatsDto) {
        return await this.bookingService.create(bookingWithSeats);

    }

    @Get()
    async getAll():Promise<Booking[]>{
        return await this.bookingService.findAll();
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
