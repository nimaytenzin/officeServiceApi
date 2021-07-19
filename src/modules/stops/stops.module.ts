import { Module } from '@nestjs/common';
import { StopsService } from './stops.service';
import { StopsController } from './stops.controller';
import { StopsProviders } from './stops.providers';

@Module({
  providers: [StopsService,...StopsProviders],
  exports:[StopsService],
  controllers: [StopsController]
})
export class StopsModule {}
