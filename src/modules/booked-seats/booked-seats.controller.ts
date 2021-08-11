import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BookedSeat } from './booked-seats.entity';
import { BookedSeatsService } from './booked-seats.service';
import { BookedSeatsDto } from './dto/bookedSeat.dto';

@Controller('booked-seats')
export class BookedSeatsController {
    constructor(private bookedSeatService: BookedSeatsService) { }

    @Post()
    async create(@Body() bookedSeats: BookedSeatsDto) {
        return await this.bookedSeatService.create(bookedSeats);
    }

    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<BookedSeat> {
        return await this.bookedSeatService.findOneById({
            where: { id }
        });
    }

    @Get('/booking-id/:id')
    async findAllByBookingId(@Param('id') id: number): Promise<BookedSeat[]> {
        return await this.bookedSeatService.findAllByBookingId({
            where: { id }
        });
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() bookedSeats: BookedSeatsDto) {
        const { numRows, num } = await this.bookedSeatService.update(id, bookedSeats);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const deleted = await this.bookedSeatService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }

    @Delete('deleteByBooking/:bookingId')
    async deleteByBookingId(@Param('bookingId') bookingId: number) {
        const deleted = await this.bookedSeatService.deleteAllByBookingId(bookingId);

        if (deleted === 0) {
            throw new NotFoundException('This Seat doesn\'t exist');
        }
        return 'Successfully deleted';
    }


}
