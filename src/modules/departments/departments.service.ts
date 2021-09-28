import { Inject, Injectable } from '@nestjs/common';
import { DEPARTMENT_REPOSITORY } from '../../core/constants/index'
import { Division } from '../divisions/division.entity';
import { Section } from '../sections/section.entity';
import { Department } from './department.entity';
import { DepartmentDTO } from './dto/department.dto';

@Injectable()
export class DepartmentsService {
    constructor(@Inject(DEPARTMENT_REPOSITORY) private readonly departmentRepository: typeof Department) {}

    async create(department: DepartmentDTO): Promise<Department>{
        return await this.departmentRepository.create<Department>(department);
    }
    
    async findAll(): Promise<Department[]>{
        return this.departmentRepository.findAll<Department>(
            {include: [{
                model:Division,
                include:[Section]
            }],}
        );
    }

    async findOneById(id: number): Promise<Department>{
        return this.departmentRepository.findOne<Department>({
            where: {id}
        });
    }

    async update(id,data){
        const [numRows,num] = await this.departmentRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.departmentRepository.destroy({ where: { id } });
    }


}
