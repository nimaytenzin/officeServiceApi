import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BookingWithSeatsDto } from './dto/bookingwithSeats.dto'

import { BookingsService } from "./bookings.service"

@Controller('bookings')
export class BookingsController {

    constructor(
        private bookingService: BookingsService
    ) { }

    @Post()
    async create(@Body() bookingWithSeats: BookingWithSeatsDto) {
        return await this.bookingService.create(bookingWithSeats);

    }

}
