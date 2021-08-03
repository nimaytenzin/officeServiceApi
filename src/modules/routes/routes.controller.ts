import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { RouteDto } from './dto/route.dto';
import { Route} from './route.entity'
import { RoutesService } from './routes.service';
import { RouteDayService } from '../route-day/route-day.service';
import { RouteDayDto } from '../route-day/dto/routeDay.dto';

@Controller('routes')
export class RoutesController {
    constructor(
        private routesService: RoutesService,
        private routeDayService: RouteDayService
    ) { }


    @Get()
    async findAll(): Promise<Route[]> {
        return await this.routesService.findAll();
    }


    @Get(":id")
    async findOneById(@Param() params) {
        console.log(params.id);
        return await this.routesService.findOneById(params.id);
    }

    @Get("origin/:id")
    async findOneByOrigin(@Param() params) {
        return await this.routesService.findAllByOriginId(params.id);
    }

    @Get("destination/:id")
    async findOneByDestination(@Param() params) {
        return await this.routesService.findAllByDestinationId(params.id);
    }

    @Post()
    async create(@Body() routes: RouteDto) {
        const created = await this.routesService.create(routes);

        var routeDays = routes.days;
        var routeDayObject = [];
        routeDays.forEach((x, i) => {
            console.log(x["Calendar_Date"]);
            routeDayObject.push({ routeId: created.id, day: x });
        })

        return await this.routeDayService.createBulk(routeDayObject);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() routes: RouteDto) {
        const { numRows, num } = await this.routesService.update(id, routes);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'updated sccuessfully';
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const deleted = await this.routesService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }

}
