import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Designation } from './designation.entity';
import { DesignationsService } from './designations.service';
import { DesignationDto } from './dto/designation.dto';

@Controller('designations')
export class DesignationsController {
    constructor(private designationsService: DesignationsService){}


    @Get()
    async findAll():Promise<Designation[]>{
        return await this.designationsService.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') id:number){
        return await this.designationsService.findOneById(id);
    }

    @Post()
    async create(@Body() Designation: DesignationDto){
        return await this.designationsService.create(Designation);
    }

    
    @Put(':id')
    async update(@Param('id') id: number,@Body() Designation: DesignationDto){
        const { numRows, num} = await this.designationsService.update(id, Designation);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }
    
    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.designationsService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }

}
