import { Module } from '@nestjs/common';
import { CalendarDatesService } from './calendar-dates.service';
import { CalendarDatesController} from './calendar-dates.controller';
import { calendarDatesProviders } from './calendar-dates.providers';

@Module({
  providers: [CalendarDatesService,...calendarDatesProviders],
  exports:[CalendarDatesService],
  controllers: [CalendarDatesController]
})
export class CalendarDatesModule {}
