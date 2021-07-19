import { Controller,Post,Get,Request,Delete,Body,Param,Put,NotFoundException} from '@nestjs/common';
import { ScheduleDto } from './dto/schedule.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {

    constructor(private scheduleService: SchedulesService) {}

    // @UseGuards(AuthGuard('local'))
    @Get(":id")
    async findOneById(@Param() params){
        console.log(params.id);
        return await this.scheduleService.findOneById(params.id);
    }

    @Get("date/:date")
    async findOneByDate(@Param() params){
        // convert datetime from long to date string
        // Time part is ignored 
        var longDate = Number(params.date);
        var dateTime = new Date(longDate);
        var dateString = dateTime.toJSON().split("T");

        console.log(dateTime);
        console.log(longDate);
        console.log(dateString[0]);
        return await this.scheduleService.findAllByDate(dateString[0]);
    }

    @Post()
    async create(@Body() schedules: ScheduleDto) {
        return await this.scheduleService.create(schedules);
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
