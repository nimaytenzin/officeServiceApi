import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { schedulesProviders } from './schedules.providers';
import { SchedulesController } from './schedules.controller';
import { CalendarDatesModule } from '../calendar-dates/calendar-dates.module';
import { BookingsModule } from '../bookings/bookings.module';
import { RoutesModule } from '../routes/routes.module';

@Module({
  providers: [SchedulesService,...schedulesProviders],
  exports: [SchedulesService],
  controllers: [SchedulesController],
  imports:[CalendarDatesModule,BookingsModule, RoutesModule]
})
export class SchedulesModule {}