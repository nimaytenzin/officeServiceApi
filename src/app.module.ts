import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from "@nestjs/config";
import { StaffModule } from './modules/staff/staff.module';
import { DepartmentsModule } from './modules/departments/departments.module'
import { DivisionsModule } from './modules/divisions/divisions.module'
import { SectionsModule } from './modules/sections/sections.module';
import { MulterModule } from '@nestjs/platform-express';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MulterModule.register({
      dest: './upload',
    }),
    DatabaseModule,
    StaffModule,
    DepartmentsModule,
    DivisionsModule,
    SectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
