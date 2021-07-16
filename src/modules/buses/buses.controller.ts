import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
import { Bus } from './buses.entity';
import { BusesService } from './buses.service';
import { BusDto } from './dto/buses.dto';

@Controller('buses')
export class BusesController {

    constructor( private busService: BusesService){}


    @Get()
    async findAll():Promise<Bus[]>{
        return await this.busService.findAll();
    }

    @Get(":id")
    async findOneById(@Param() params){
        console.log(params.id);
        return await this.busService.findOneById(params.id);
    }

    @Post()
    async create(@Body() buses: BusDto) {
        return await this.busService.create(buses);
    }



    @Put(':id')
    async update(@Param('id')id: number, @Body() buses: BusDto) {
        const { numRows, num} = await this.busService.update(id, buses);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }

    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.busService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
