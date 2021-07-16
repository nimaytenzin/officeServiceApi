import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { BusesModule } from './modules/buses/buses.module';
import { BusTypesModule } from './modules/bus-types/bus-types.module';
import { SeatsModule } from './modules/seats/seats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    SchedulesModule,
    BookingsModule,
    BusesModule,
    BusTypesModule,
    SeatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
