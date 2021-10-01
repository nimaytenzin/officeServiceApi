import { Inject, Injectable } from '@nestjs/common';
import { POSITION_REPOSITORY } from 'src/core/constants';
import { PositionDTO } from './dto/positions.dto';
import { Position } from './position.entity';

@Injectable()
export class PositionsService {

    constructor(@Inject(POSITION_REPOSITORY) private readonly positionRepository: typeof Position) {}

    async create(Position: PositionDTO): Promise<Position>{
        return await this.positionRepository.create<Position>(Position);
    }
    
    async findAll(): Promise<Position[]>{
        return this.positionRepository.findAll<Position>();
    }

    async findOneById(id: number): Promise<Position>{
        return this.positionRepository.findOne<Position>({
            where: {id}
        });
    }

    async update(id,data){
        const [numRows,num] = await this.positionRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.positionRepository.destroy({ where: { id } });
    }
}
