import { Inject, Injectable } from '@nestjs/common';
import { STOPS_REPOSITORY } from 'src/core/constants';
import { StopDto } from './dto/stop.dto';
import { Stop } from './stop.entity';


@Injectable()
export class StopsService {
    constructor(@Inject(STOPS_REPOSITORY) private readonly stopsRepository: typeof Stop) {}

    async create(stop: StopDto): Promise<Stop>{
        return await this.stopsRepository.create<Stop>(stop);
    }
    
    async findAll(): Promise<Stop[]>{
        return this.stopsRepository.findAll<Stop>();
    }

    async findOneById(id: number): Promise<Stop>{
        return this.stopsRepository.findOne<Stop>({
            where: {id}
        });
    }

    async update(id,data){
        const [numRows,num] = await this.stopsRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.stopsRepository.destroy({ where: { id } });
    }
}
