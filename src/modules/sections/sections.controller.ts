
import { Body,Controller, Get, Param, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { SectionDTO } from './dto/section.dto';
import { Section } from './section.entity';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
    constructor(private sectionsService: SectionsService){}


    @Get()
    async findAll():Promise<Section[]>{
        return await this.sectionsService.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') id:number){
        return await this.sectionsService.findOneById(id);
    }

    @Post()
    async create(@Body() Section: SectionDTO){
        return await this.sectionsService.create(Section);
    }

    
    @Put(':id')
    async update(@Param('id') id: number,@Body() Section: SectionDTO){
        const { numRows, num} = await this.sectionsService.update(id, Section);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }
    
    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.sectionsService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
