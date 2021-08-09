import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { bookingProviders } from './bookings.providers';
import { BookedSeatsModule } from '../booked-seats/booked-seats.module'

@Module({
  providers: [BookingsService,...bookingProviders],
  controllers: [BookingsController],
  exports:[ BookingsService],
  imports:[BookedSeatsModule]
})
export class BookingsModule {}
