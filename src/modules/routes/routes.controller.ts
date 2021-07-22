import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { RouteDto } from './dto/route.dto';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {
    constructor(private routesService: RoutesService) {}

    @Get(":id")
    async findOneById(@Param() params){
        console.log(params.id);
        return await this.routesService.findOneById(params.id);
    }

    @Get("origin/:id")
    async findOneByOrigin(@Param() params){
        return await this.routesService.findAllByOriginId(params.id);
    }

    @Get("destination/:id")
    async findOneByDestination(@Param() params){
        return await this.routesService.findAllByDestinationId(params.id);
    }

    @Post()
    async create(@Body() routes: RouteDto) {
        return await this.routesService.create(routes);
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() routes: RouteDto) {
        const { numRows, num} = await this.routesService.update(id, routes);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'updated sccuessfully';
    }

    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.routesService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }

}
