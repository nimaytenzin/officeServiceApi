import { Controller,Post,Get,Request,Delete,Body,Param,Put,NotFoundException} from '@nestjs/common';
import { ScheduleDayDto } from './dto/schedule-day.dto';
import { ScheduleDto } from './dto/schedule.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {

    constructor(private scheduleService: SchedulesService) {}

    // @UseGuards(AuthGuard('local'))
    @Get(":id")
    async findAllByRoute(@Param() params){
        return await this.scheduleService.findAllByRoute(params.id);
    }

    @Get("between/:from/:to")
    async findAllBetweenDates(@Param() params){
        var fromDateTime = new Date(Number(params.from)); 
        var toDateTime = new Date(Number(params.to)); 
        return await this.scheduleService.findAllBetweenDates(fromDateTime,toDateTime);
    }

    @Post()
    async createScheduleOnDayBetweenDates(@Body() scheduleObject: ScheduleDayDto) {
        return await this.scheduleService.createScheduleOnDayBetweenDate(scheduleObject);
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() schedules: ScheduleDto) {
        const { numRows, num} = await this.scheduleService.update(id, schedules);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'updated sccuessfully';
    }

    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.scheduleService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
