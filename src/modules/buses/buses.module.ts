import { Module } from '@nestjs/common';
import { busesProviders } from './buses.providers';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';

@Module({
  providers: [BusesService,...busesProviders],
  exports:[ BusesService],
  controllers: [BusesController]
})
export class BusesModule {}
