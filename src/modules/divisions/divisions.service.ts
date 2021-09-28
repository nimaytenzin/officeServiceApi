import { Inject, Injectable } from '@nestjs/common';
import { DIVISION_REPOSITORY } from 'src/core/constants';
import { Department } from '../departments/department.entity';
import { Section } from '../sections/section.entity';
import { Division } from './division.entity';
import { DivisionDTO } from './dto/department.dto';

@Injectable()
export class DivisionsService {
    constructor(@Inject(DIVISION_REPOSITORY) private readonly divisionsRepository: typeof Division) {}

    async create(division: DivisionDTO): Promise<Division>{
        return await this.divisionsRepository.create<Division>(division);
    }
    
    async findAll(): Promise<Division[]>{
        return this.divisionsRepository.findAll<Division>({
            include:[Section,Department]
        });
    }

    async findOneById(id: number): Promise<Division>{
        return this.divisionsRepository.findOne<Division>({
            where: {id}
        });
    }

    async update(id,data){
        const [numRows,num] = await this.divisionsRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.divisionsRepository.destroy({ where: { id } });
    }

}
