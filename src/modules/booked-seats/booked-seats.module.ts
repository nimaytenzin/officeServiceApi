import { Module } from '@nestjs/common';
import { BookedSeatsService } from './booked-seats.service';
import { BookedSeatsController } from './booked-seats.controller';
import { BookedSeatsProviders } from './booked-seats.providers';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
@Module({
  providers: [BookedSeatsService,...BookedSeatsProviders],
  exports: [BookedSeatsService],
  controllers: [BookedSeatsController],
  imports:[
    // RabbitMQModule.forRoot(RabbitMQModule,{
    //   uri: "amqp://guest:guest@localhost:5672"
    // })
]
})
export class BookedSeatsModule {}
