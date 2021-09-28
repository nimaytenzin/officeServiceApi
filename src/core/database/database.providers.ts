import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Staff } from '../../modules/staff/staff.entity';
import { Department } from '../../modules/departments/department.entity'
import { Division } from 'src/modules/divisions/division.entity';
import { Section } from 'src/modules/sections/section.entity';

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
        sequelize.addModels([Staff,Department,Division,Section]);
        await sequelize.sync();
        return sequelize;
    },
}];