import { Module } from '@nestjs/common';
import { DesignationsProvider } from './designation.provider';
import { DesignationsController } from './designations.controller';
import { DesignationsService } from './designations.service';

@Module({
  providers: [DesignationsService,...DesignationsProvider],
  exports:[DesignationsService],
  controllers: [DesignationsController]
})
export class DesignationsModule {}
