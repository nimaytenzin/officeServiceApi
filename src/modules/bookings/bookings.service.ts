import { Injectable,Inject } from '@nestjs/common';
import { Booking } from './booking.entity';
import { BookingDto } from './dto/booking.dto';
import { BOOKING_REPOSITORY } from '../../core/constants'
import sequelize from 'sequelize';

@Injectable()
export class BookingsService {
    constructor(@Inject(BOOKING_REPOSITORY) private readonly bookingRepository: typeof Booking) { }

    async create(booking: BookingDto): Promise<Booking> {
        return await this.bookingRepository.create<Booking>(booking);
    }

    async findOneById(id: number): Promise<Booking> {
        return await this.bookingRepository.findOne<Booking>({ 
            where: { id } });
    }

    async findOneByDate(date: string): Promise<Booking[]>{
        return await this.bookingRepository.findAll<Booking>({
            where: sequelize.where(
                sequelize.fn('date',sequelize.col('bookingTime')),
                "=",
                date
            )
        })
    }

    async update(id,data){
        const [numRows,num] = await this.bookingRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.bookingRepository.destroy({ where: { id } });
    }
}
