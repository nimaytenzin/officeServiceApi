import { Module } from '@nestjs/common';
import { PositionsProvider } from './position.provider';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';

@Module({
    providers: [PositionsService,...PositionsProvider],
    exports:[PositionsService],
    controllers: [PositionsController]
  })
export class PositionsModule {}
