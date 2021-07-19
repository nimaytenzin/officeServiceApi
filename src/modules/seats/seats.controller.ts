import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { SeatsDto } from './dto/seats.dto';
import { Seat } from './seat.entity';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsController {

    
    constructor( private seatService: SeatsService){}


    @Get()
    async findAll():Promise<Seat[]>{
        return await this.seatService.findAll();
    }

    @Get(":id")
    async findOneById(@Param() params):Promise<Seat>{
        console.log(params.id);
        return await this.seatService.findOneById(params.id);
    }

    @Post()
    async create(@Body() seats: SeatsDto) {
        return await this.seatService.create(seats);
    }



    @Put(':id')
    async update(@Param('id')id: number, @Body() seats: SeatsDto) {
        const { numRows, num} = await this.seatService.update(id, seats);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }

    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.seatService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
