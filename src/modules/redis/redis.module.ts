import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisProviders } from './redis.providers';

@Module({
  providers: [RedisService,...RedisProviders],
  exports:[RedisService,...RedisProviders]
})
export class RedisModule{}
