import { Body,Controller, Get, Param, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { Division } from './division.entity';
import { DivisionsService } from './divisions.service';
import { DivisionDTO } from './dto/department.dto';

@Controller('divisions')
export class DivisionsController {
    constructor(private divisionService: DivisionsService){}


    @Get()
    async findAll():Promise<Division[]>{
        return await this.divisionService.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') id:number){
        return await this.divisionService.findOneById(id);
    }

    @Post()
    async create(@Body() division: DivisionDTO){
        return await this.divisionService.create(division);
    }

    
    @Put(':id')
    async update(@Param('id') id: number,@Body() division: DivisionDTO){
        const { numRows, num} = await this.divisionService.update(id, division);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }
    
    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.divisionService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
