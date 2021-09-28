import { Inject, Injectable } from '@nestjs/common';
import { SECTION_REPOSITORY } from 'src/core/constants';
import { Department } from '../departments/department.entity';
import { Division } from '../divisions/division.entity';
import { SectionDTO } from './dto/section.dto';
import { Section } from './section.entity';

@Injectable()
export class SectionsService {

    constructor(@Inject(SECTION_REPOSITORY) private readonly sectionsRepository: typeof Section) {}

    async create(Section: SectionDTO): Promise<Section>{
        return await this.sectionsRepository.create<Section>(Section);
    }
    
    async findAll(): Promise<Section[]>{
        return this.sectionsRepository.findAll<Section>({
            include:[{
                model:Division,
                include:[Department]
            }]
        });
    }

    async findOneById(id: number): Promise<Section>{
        return this.sectionsRepository.findOne<Section>({
            where: {id}
        });
    }

    async update(id,data){
        const [numRows,num] = await this.sectionsRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.sectionsRepository.destroy({ where: { id } });
    }

}
