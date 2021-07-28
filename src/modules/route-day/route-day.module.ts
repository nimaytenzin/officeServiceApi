import { Module } from '@nestjs/common';
import { RouteDayService } from './route-day.service';
import { RouteDayController } from './route-day.controller';
import { routeDaysProviders } from './routesDay.providers';

@Module({
  providers: [RouteDayService,...routeDaysProviders],
  exports:[RouteDayService],
  controllers: [RouteDayController]
})
export class RouteDayModule {}
