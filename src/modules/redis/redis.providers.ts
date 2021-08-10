import { Provider } from "@nestjs/common";
import Redis from 'ioredis';
import { REDIS_PUBLISHER } from "src/core/constants";

export type RedisClient = Redis.Redis;

export const RedisProviders: Provider[] = [
    {
        useFactory: (): RedisClient=>{
            return new Redis({
                host: '127.0.0.1',
                port: 6379,
                db:0
            });
        },
        provide: REDIS_PUBLISHER
    },
];
