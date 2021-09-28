import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentsModule } from './modules/departments/departments.module'
import { DivisionsModule } from './modules/divisions/divisions.module'
import { SectionsModule } from './modules/sections/sections.module';



@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    DepartmentsModule,
    DivisionsModule,
    SectionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
