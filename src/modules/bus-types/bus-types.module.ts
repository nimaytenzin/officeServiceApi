import { Module } from '@nestjs/common';
import { BusTypesService } from './bus-types.service';
import { BusTypesController } from './bus-types.controller';
import { busTypesProviders } from './bus-types.providers';

@Module({
  providers: [BusTypesService,...busTypesProviders],
  exports:[ BusTypesService],
  controllers: [BusTypesController]
})
export class BusTypesModule {}
