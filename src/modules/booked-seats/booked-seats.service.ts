import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { BOOKEDSEATS_REPOSITORY } from 'src/core/constants';
import { BookedSeat } from './booked-seats.entity';
import { BookedSeatsDto } from './dto/bookedSeat.dto';

@Injectable()
export class BookedSeatsService {
    constructor(
        @Inject(BOOKEDSEATS_REPOSITORY)private readonly bookedSeatsRepository:typeof BookedSeat, 
    private readonly amqp:AmqpConnection
    ){}

    async publishBooking(message: string){
        let bookingObject = {
            "roomId":"2",
            "messageType":"ON_BOOK",
            "bookList":[1,2]
        }
        return await this.amqp.publish("","ON_BOOK",bookingObject)
        // await this.amqp.createChannel().then((channel)=>{
        //     channel.assertQueue("ON_BOOK");
        //     channel.sendToQueue("ON_BOOK",Buffer.from("test"))
        // }).catch((err)=>{
        //     console.log(err)
        // })
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