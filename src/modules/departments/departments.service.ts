import { Inject, Injectable } from '@nestjs/common';
import { DEPARTMENT_REPOSITORY } from '../../core/constants/index'
import { Designation } from '../designations/designation.entity';
import { Division } from '../divisions/division.entity';
import { Position } from '../positions/position.entity';
import { Section } from '../sections/section.entity';
import { Staff } from '../staff/staff.entity';
import { Department } from './department.entity';
import { DepartmentDTO } from './dto/department.dto';

@Injectable()
export class DepartmentsService {
    constructor(@Inject(DEPARTMENT_REPOSITORY) private readonly departmentRepository: typeof Department) { }

    async create(department: DepartmentDTO): Promise<Department> {
        return await this.departmentRepository.create<Department>(department);
    }

    async findAll(): Promise<Department[]> {
        return this.departmentRepository.findAll<Department>(
            {
                include: [{
                    model: Division,
                    as: "divisions",
                    include: [
                        {
                        model: Staff,
                        as:"staffs",
                        include:[Position, Designation]
                        },
                      {
                          model:Section
                      }
                    ],
                    order:[["staffs","positionId"]]
                }],
                order: [["divisions", 'id'],["divisions","staffs","positionId"]]
            }
        );
    }

    async findOneById(id: number): Promise<Department> {
        return this.departmentRepository.findOne<Department>({
            where: { id }
        });
    }

    async update(id, data) {
        const [numRows, num] = await this.departmentRepository.update(
            { ...data },
            {
                where: { id },
                returning: true
            }
        );
        return { numRows, num }
    }

    async delete(id) {
        return await this.departmentRepository.destroy({ where: { id } });
    }


}
