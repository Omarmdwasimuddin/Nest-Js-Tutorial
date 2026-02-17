import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeBdService } from './employee-bd.service';
import { Employee } from './employees.entity';

@Controller('employee-bd')
export class EmployeeBdController {
    constructor(private readonly employeeBdService: EmployeeBdService) {}

    @Post()
    async createEmployee(@Body() employeeData: Partial<Employee>) {
        return this.employeeBdService.create(employeeData);
    }
}
