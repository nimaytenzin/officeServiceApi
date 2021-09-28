import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { SectionsProvider } from './sections.provider';

@Module({
  providers: [SectionsService,...SectionsProvider],
  exports:[SectionsService],
  controllers: [SectionsController]
})
export class SectionsModule {}
