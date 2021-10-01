import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PositionDTO } from './dto/positions.dto';
import { Position } from './position.entity';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {

    constructor(private positionService: PositionsService){}

    @Get()
    async findAll():Promise<Position[]>{
        return await this.positionService.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') id:number){
        return await this.positionService.findOneById(id);
    }

    @Post()
    async create(@Body() Position: PositionDTO){
        return await this.positionService.create(Position);
    }
     
    @Put(':id')
    async update(@Param('id') id: number,@Body() division: PositionDTO){
        const { numRows, num} = await this.positionService.update(id, division);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }
    
    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.positionService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
