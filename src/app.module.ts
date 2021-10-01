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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PositionsModule } from './modules/positions/positions.module';
import { DesignationsModule } from './modules/designations/designations.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
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
    PositionsModule,
    DesignationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
