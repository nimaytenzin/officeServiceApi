import { Body,Controller, Get, Param, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { Department } from './department.entity';
import { DepartmentsService } from './departments.service';
import { DepartmentDTO } from './dto/department.dto';

@Controller('departments')
export class DepartmentsController {

    constructor(private departmentService: DepartmentsService){}


    @Get()
    async findAll():Promise<Department[]>{
        return await this.departmentService.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') id:number){
        return await this.departmentService.findOneById(id);
    }

    @Post()
    async create(@Body() department: DepartmentDTO){
        return await this.departmentService.create(department);
    }

    
    @Put(':id')
    async update(@Param('id') id: number,@Body() department: DepartmentDTO){
        const { numRows, num} = await this.departmentService.update(id, department);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }
    
    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.departmentService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
