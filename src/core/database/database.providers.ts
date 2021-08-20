import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Schedule } from 'src/modules/schedules/schedule.entity';
import { Booking } from 'src/modules/bookings/booking.entity';
import { Bus } from 'src/modules/buses/bus.entity';
import { BusType } from 'src/modules/bus-types/busType.entity';
import { Seat } from 'src/modules/seats/seat.entity';
import { Stop } from 'src/modules/stops/stop.entity';
import { Invoice } from 'src/modules/invoices/invoice.entity';
import { BookedSeat } from 'src/modules/booked-seats/booked-seats.entity';
import { CalendarDate } from 'src/modules/calendar-dates/calendar-dates.entity';
import { Route } from 'src/modules/routes/route.entity';
import { RouteDay } from 'src/modules/route-day/route-day.entity';
import {  Feedback} from 'src/modules/feedbacks/feedback.entity';
import { BankDetail } from 'src/modules/bank-details/bank-details.entity'

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User,Schedule,Booking, Bus, BusType, Seat, Stop, Invoice,BookedSeat, CalendarDate, Route, RouteDay, Feedback, BankDetail]);
        await sequelize.sync();
        return sequelize;
    },
}];