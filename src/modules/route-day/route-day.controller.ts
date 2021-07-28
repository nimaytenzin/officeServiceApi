import { Controller,Get,Post, Param,Body,Put,NotFoundException,Delete } from '@nestjs/common';
import { RouteDayDto } from './dto/routeDay.dto';
import { RouteDayService } from './route-day.service';

@Controller('route-day')
export class RouteDayController {
    constructor(private routeDayService: RouteDayService) {}

    @Get(":routeId")
    async findOneByOrigin(@Param() params){
        return await this.routeDayService.findAllByRouteId(params.routeId);
    }

    @Post()
    async create(@Body() routeDay: RouteDayDto) {
        return await this.routeDayService.create(routeDay);
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() routeDay: RouteDayDto) {
        const { numRows, num} = await this.routeDayService.update(id, routeDay);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'updated sccuessfully';
    }

    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.routeDayService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
