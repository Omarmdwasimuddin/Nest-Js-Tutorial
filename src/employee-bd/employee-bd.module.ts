import { Module } from '@nestjs/common';
import { EmployeeBdService } from './employee-bd.service';
import { EmployeeBdController } from './employee-bd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeBdService],
  controllers: [EmployeeBdController]
})
export class EmployeeBdModule {}
