import { Injectable,Inject } from '@nestjs/common';
import { Booking } from './booking.entity';
import { BOOKING_REPOSITORY } from '../../core/constants'
import { BookingWithSeatsDto } from './dto/bookingwithSeats.dto'
import { BookedSeatsDto} from '../booked-seats/dto/bookedSeat.dto'
import sequelize from 'sequelize';
import { BookedSeatsService} from '../booked-seats/booked-seats.service'


@Injectable()
export class BookingsService {
    constructor(@Inject(BOOKING_REPOSITORY) private readonly bookingRepository: typeof Booking, private bookedSeatServices:BookedSeatsService ) { }

    async create(bookingwithSeats: BookingWithSeatsDto): Promise<Booking> {
        
        var newBooking =  await this.bookingRepository.create<Booking>(bookingwithSeats.booking);
        let bookingId = newBooking.id;
        
        bookingwithSeats.seats.forEach(seat => {
            let newSeat:BookedSeatsDto ={
                bookingId : bookingId,
                scheduleId : bookingwithSeats.booking.scheduleId,
                seatNumber: seat
            }
          this.bookedSeatServices.create(newSeat)
        });

        return newBooking
        
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
