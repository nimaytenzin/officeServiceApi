import { Controller, Param, Get } from '@nestjs/common';
import { CalendarDatesService } from './calendar-dates.service';
import { CalendarDate } from './calendar-dates.entity';

@Controller('dates')
export class CalendarDatesController {
    constructor( private calendarDatesService: CalendarDatesService){}

    @Get(':time')
    async findOneByDate(@Param('time') time: number):Promise<CalendarDate>{
        var dateTimeObject = new Date(Number(time));
        var dateString = dateTimeObject.toJSON().split("T")[0];

        return await this.calendarDatesService.findOneByDate(dateString);
    }

    @Get("between/:day/:from/:to")
    async findOneById(@Param() params):Promise<CalendarDate[]>{
        var dayStrings = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        var day = dayStrings[Number(params.day)];

        var fromDateTime = new Date(Number(params.from)); 
        var toDateTime = new Date(Number(params.to)); 

        return await this.calendarDatesService.findAllDayBetweenDates(day,fromDateTime,toDateTime);
    }
}
