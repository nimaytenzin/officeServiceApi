import { Module } from '@nestjs/common';
import { DepartmentsProvider } from './department.provider';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  providers: [DepartmentsService,...DepartmentsProvider],
  exports:[DepartmentsService],
  controllers: [DepartmentsController]
})
export class DepartmentsModule {}
