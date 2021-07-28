import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { routesProviders } from './routes.providers';
import { RouteDayService } from '../route-day/route-day.service';
import { RouteDayModule } from '../route-day/route-day.module';

@Module({
  providers: [RoutesService,...routesProviders],
  exports:[RoutesService],
  controllers: [RoutesController],
  imports:[RouteDayModule] 
})
export class RoutesModule {}
