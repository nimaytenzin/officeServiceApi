import { Inject, Injectable } from '@nestjs/common';
import { SEATS_REPOSITORY } from '../../core/constants'
import { Bus } from '../buses/bus.entity';
import { SeatsDto } from './dto/seats.dto';
import { Seat } from './seat.entity';

@Injectable()
export class SeatsService {

    
    constructor(@Inject(SEATS_REPOSITORY) private readonly seatsRepository: typeof Seat){}


    async create(seats: SeatsDto): Promise<Seat> {
        return await this.seatsRepository.create<Seat>(seats);
    }

    async findAll(): Promise<Seat[]> {
        return await this.seatsRepository.findAll({
            include: [Bus],
        });
      }

    async findOneById(id: number): Promise<Seat> {
        return await this.seatsRepository.findOne<Seat>({ 
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
