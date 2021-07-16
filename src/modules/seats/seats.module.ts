import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { SeatsProviders } from './seats.providers';

@Module({
  providers: [SeatsService,...SeatsProviders],
  exports: [SeatsService],
  controllers: [SeatsController]
})
export class SeatsModule {}
