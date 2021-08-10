import { Inject, Injectable } from '@nestjs/common';
import { BOOKEDSEATS_REPOSITORY } from 'src/core/constants';
import { RedisService } from '../redis/redis.service';
import { BookedSeat } from './booked-seats.entity';
import { BookedSeatsDto } from './dto/bookedSeat.dto';

@Injectable()
export class BookedSeatsService {
    constructor(@Inject(BOOKEDSEATS_REPOSITORY)private readonly bookedSeatsRepository:typeof BookedSeat, private readonly redisService: RedisService){
    }

    async redisTest(): Promise<any>{
        var bookMsg = {
            "roomId":"2",
            "messageType":"ON_BOOK",
           "bookList":[1]
        }
        var result = await this.redisService.publish('ON_BOOK',bookMsg);
        // TODO: validation for listeners
        // if result is not more then 0 then we need to resend the msg coz there is no listener on the other end
        return result;
    }
    async create(bookedSeats: BookedSeatsDto): Promise<BookedSeat>{
        return await this.bookedSeatsRepository.create<BookedSeat>(bookedSeats);
    }
    async findAllByBookingId(id): Promise<BookedSeat[]>{
        return await this.bookedSeatsRepository.findAll<BookedSeat>({
            where : {bookingId:id}
        });
    }

    async findAllbyScheduleAndBookingId(bookingId,ScheduleId):Promise<BookedSeat[]>{
        return await this.bookedSeatsRepository.findAll<BookedSeat>({
            where:{
                scheduleId:ScheduleId,
                bookingId:bookingId
            }
        })
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

    async deleteAllByBookingId(bookingId) {
        return await this.bookedSeatsRepository.destroy({ where: { 
            bookingId:bookingId
         }}).then(res =>{
             return res
         });
    }
}