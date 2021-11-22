import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER_DEVELOPMENT,
        password: process.env.DB_PASS_DEVELOPMNET,
        database: process.env.DB_NAME_DEVELOPMENT,
        host: process.env.DB_HOST_DEVELOPMENT,
        port: process.env.DB_PORT_DEVELOPMENT,
        dialect: process.env.DB_DIALECT,
    },
    test: {
        username: process.env.DB_USER_DEVELOPMENT,
        password: process.env.DB_PASS_DEVELOPMNET,
        database: process.env.DB_NAME_DEVELOPMENT,
        host: process.env.DB_HOST_DEVELOPMENT,
        port: process.env.DB_PORT_DEVELOPMENT,
        dialect: process.env.DB_DIALECT,
    },
    production: {
        username: process.env.DB_USER_PRODUCTION,
        password: process.env.DB_PASS_PRODUCTION,
        database: process.env.DB_NAME_PRODUCTION,
        host: process.env.DB_HOST_PRODUCTION,
        port: process.env.DB_PORT_PRODUCTION,
        dialect: process.env.DB_DIALECT,
    },
};