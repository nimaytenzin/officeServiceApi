import { Controller,Post,Get,Request,Delete,Body,Param,Put,NotFoundException} from '@nestjs/common';
import { ScheduleDayDto } from './dto/schedule-day.dto';
import { ScheduleDto } from './dto/schedule.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {

    constructor(private scheduleService: SchedulesService) {}

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

    @Get("date/:date")
    async findAllByDate(@Param() params){
        return await this.scheduleService.findByDate(params.date)
    }

    @Get("busdetails/:bookingId")
    async getScheduleBy(@Param() params){
        return await this.scheduleService.findBusByBookingId(params.bookingId)
    }

    @Get(":routeId/:date")
    async findByRouteDate(@Param() params){
        return await this.scheduleService.findByRouteDate(params.routeId,params.date)
    }

    @Get("nextSeven")
    async getNextSevenDaySchedule(){
        return await this.scheduleService.getNextSevenDaySchedule()
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

    @Delete('/route/:routeId')
    async deletebyRouteId(@Param('routeId') id: number ) {
        const deleted = await this.scheduleService.deleteByRouteId(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
