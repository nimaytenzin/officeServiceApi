import { Inject, Injectable } from '@nestjs/common';
import { BOOKEDSEATS_REPOSITORY } from 'src/core/constants';
import { BookedSeat } from './booked-seats.entity';
import { BookedSeatsDto } from './dto/bookedSeat.dto';

@Injectable()
export class BookedSeatsService {
    constructor(@Inject(BOOKEDSEATS_REPOSITORY)private readonly bookedSeatsRepository:typeof BookedSeat){}

    async create(bookedSeats: BookedSeatsDto): Promise<BookedSeat>{
        return await this.bookedSeatsRepository.create<BookedSeat>(bookedSeats);
    }
    async findAllByBookingId(id): Promise<BookedSeat[]>{
        return await this.bookedSeatsRepository.findAll<BookedSeat>({
            where : {bookingId:id}
        });
    }
    async findOneById(id): Promise<BookedSeat>{
        return await this.bookedSeatsRepository.findOne<BookedSeat>({
            where: {id}
        });
    }
    async update(id,data){
        const [numRows,num] = await this.bookedSeatsRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.bookedSeatsRepository.destroy({ where: { id } });
    }
}