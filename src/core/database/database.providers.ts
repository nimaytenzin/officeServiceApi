import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Schedule } from 'src/modules/schedules/schedule.entity';
import { Booking } from 'src/modules/bookings/booking.entity';
import { Bus } from 'src/modules/buses/buses.entity';
import { BusType } from 'src/modules/bus-types/bus-types.entity';
import { Seats } from 'src/modules/seats/seats.entity';


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
        sequelize.addModels([User,Schedule,Booking, Bus, BusType, Seats]);
        await sequelize.sync();
        return sequelize;
    },
}];