import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeBdService } from './employee-bd.service';
import { Employee } from './employees.entity';

@Controller('employee-bd')
export class EmployeeBdController {
    constructor(private readonly employeeBdService: EmployeeBdService) {}

    @Post()
    async createEmployee(@Body() employeeData: Partial<Employee>) {
        return this.employeeBdService.create(employeeData);
    }

    @Get()
    async findAllEmployees(): Promise<Employee[]> {
        return this.employeeBdService.findAll();
    }

    // find by id
    @Get(':id')
    async findEmployeeById(@Param('id') id: number): Promise<Employee> {
        return this.employeeBdService.findOne(id);
    }

    // find by name
    @Get('name/:name')
    async findEmployeeByName(@Param('name') name: string): Promise<Employee[]> {
        return this.employeeBdService.findByName(name);
    }

    // search by name (partial match)
    @Get(`search/:keyword`)
    async searchEmployeeByName(@Param('keyword') keyword: string): Promise<Employee[]> {
        return this.employeeBdService.searchByName(keyword);
    }

    @Put(':id')
    async updateEmployee(
        @Param('id') id: number, 
        @Body() updateData: Partial<Employee>): Promise<Employee> {
        return this.employeeBdService.update(id, updateData);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: number): Promise<{ message: string }> {
        return this.employeeBdService.delete(id);
    }

}
