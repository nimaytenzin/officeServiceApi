import { Inject, Injectable } from '@nestjs/common';
import { SEATS_REPOSITORY } from 'src/core/constants';
import { Bus } from '../buses/buses.entity';
import { SeatsDto } from './dto/seats.dto';
import { Seats } from './seats.entity';

@Injectable()
export class SeatsService {

    
    constructor(@Inject(SEATS_REPOSITORY) private readonly seatsRepository: typeof Seats){}


    async create(seats: SeatsDto): Promise<Seats> {
        return await this.seatsRepository.create<Seats>(seats);
    }

    async findAll(): Promise<Seats[]> {
        return this.seatsRepository.findAll({
            include: [Bus],
        });
      }

    async findOneById(id: number): Promise<Seats> {
        return await this.seatsRepository.findOne<Seats>({ 
            where: { id },
            include: [Bus],
        });
    }

    async update(id,data){
        const [numRows,num] = await this.seatsRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.seatsRepository.destroy({ where: { id } });
    }
}
