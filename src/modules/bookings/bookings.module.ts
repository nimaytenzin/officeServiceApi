import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { bookingProviders } from './bookings.providers';

@Module({
  providers: [BookingsService,...bookingProviders],
  controllers: [BookingsController]
})
export class BookingsModule {}
