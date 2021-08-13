import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BusType } from './busType.entity';
import { BusTypesService } from './bus-types.service';
import { BusTypeDto } from './dto/bus-types.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('bus-types')
export class BusTypesController {

    constructor( private busTypeService: BusTypesService){}

    @Get()
    async findAll():Promise<BusType[]>{
        return await this.busTypeService.findAll();
    }


    @Get(":id")
    async findOneById(@Param() params){
        console.log(params.id);
        return await this.busTypeService.findOneById(params.id);
    }


    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() busType: BusTypeDto) {
        return await this.busTypeService.create(busType);
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() busType: BusTypeDto) {
        const { numRows, num} = await this.busTypeService.update(id, busType);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }

    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.busTypeService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
