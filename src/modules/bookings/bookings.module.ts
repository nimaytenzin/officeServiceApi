import { forwardRef, Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { bookingProviders } from './bookings.providers';
import { BookedSeatsModule } from '../booked-seats/booked-seats.module'
import { BankDetailsModule  } from '../bank-details/bank-details.module'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
@Module({
  providers: [BookingsService,...bookingProviders],
  controllers: [BookingsController],
  exports:[ BookingsService],
  imports:[
    forwardRef(() => BookedSeatsModule),
    BankDetailsModule,
    RabbitMQModule.forRoot(RabbitMQModule,{
      uri: "amqp://guest:guest@localhost:5672"
    })

    ]
})
export class BookingsModule {}
