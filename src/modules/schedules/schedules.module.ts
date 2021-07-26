import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { schedulesProviders } from './schedules.providers';
import { SchedulesController } from './schedules.controller';
import { CalendarDatesModule } from '../calendar-dates/calendar-dates.module';

@Module({
  providers: [SchedulesService,...schedulesProviders],
  exports: [SchedulesService],
  controllers: [SchedulesController],
  imports:[CalendarDatesModule]
})
export class SchedulesModule {}