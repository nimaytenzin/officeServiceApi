import { Inject, Injectable } from '@nestjs/common';
import { DESIGNATION_REPOSITORY } from 'src/core/constants';
import { Designation } from './designation.entity';
import { DesignationDto } from './dto/designation.dto';

@Injectable()
export class DesignationsService {
    constructor(@Inject(DESIGNATION_REPOSITORY) private readonly desginationRepository: typeof Designation) { }

    async create(Designation: DesignationDto): Promise<Designation> {
        return await this.desginationRepository.create<Designation>(Designation);
    }

    async findAll(): Promise<Designation[]> {
        return this.desginationRepository.findAll<Designation>();
    }

    async findOneById(id: number): Promise<Designation> {
        return this.desginationRepository.findOne<Designation>({
            where: { id }
        });
    }

    async update(id, data) {
        const [numRows, num] = await this.desginationRepository.update(
            { ...data },
            {
                where: { id },
                returning: true
            }
        );
        return { numRows, num }
    }

    async delete(id) {
        return await this.desginationRepository.destroy({ where: { id } });
    }
}
