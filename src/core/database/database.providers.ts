import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Staff } from '../../modules/staff/staff.entity';
import { Department } from '../../modules/departments/department.entity'
import { Division } from 'src/modules/divisions/division.entity';
import { Section } from 'src/modules/sections/section.entity';
import { Position } from 'src/modules/positions/position.entity';
import { Designation } from 'src/modules/designations/designation.entity';

export const databaseProviders = [{
   provide: SEQUELIZE,
   useFactory: async () => {
      let config;

      if (process.env.NODE_ENV === "production") {
         console.log("ITS PRODUCTION")
         config = databaseConfig.production;
      } else {
         config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Staff, Department, Division, Section, Position, Designation]);
      await sequelize.sync();
      return sequelize;
   },
}];