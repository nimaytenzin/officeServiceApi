import { Module } from '@nestjs/common';
import { BookedSeatsService } from './booked-seats.service';
import { BookedSeatsController } from './booked-seats.controller';
import { BookedSeatsProviders } from './booked-seats.providers';

@Module({
  providers: [BookedSeatsService,...BookedSeatsProviders],
  exports: [BookedSeatsService],
  controllers: [BookedSeatsController]
})
export class BookedSeatsModule {}
