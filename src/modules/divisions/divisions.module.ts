import { Module } from '@nestjs/common';
import { DivisionsProvider } from './division.provider';
import { DivisionsController } from './divisions.controller';
import { DivisionsService } from './divisions.service';

@Module({
    providers: [DivisionsService,...DivisionsProvider],
    exports:[DivisionsService],
    controllers: [DivisionsController]
  })
export class DivisionsModule {}
