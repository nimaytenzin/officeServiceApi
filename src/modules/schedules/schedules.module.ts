import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { schedulesProviders } from './schedules.providers';
import { SchedulesController } from './schedules.controller';

@Module({
  providers: [SchedulesService,...schedulesProviders],
  exports: [SchedulesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}