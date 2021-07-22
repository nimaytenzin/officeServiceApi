import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { routesProviders } from './routes.providers';

@Module({
  providers: [RoutesService,...routesProviders],
  exports:[RoutesService],
  controllers: [RoutesController]
})
export class RoutesModule {}
