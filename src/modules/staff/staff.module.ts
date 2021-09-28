import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { staffProviders } from './staff.providers';
import { StaffService } from './staff.service';


@Module({
    providers: [StaffService,...staffProviders],
    exports: [StaffService],
    controllers: [StaffController],
})
export class StaffModule {}
