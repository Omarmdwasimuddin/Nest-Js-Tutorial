import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class EmployeeBdService {
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    ) {}

    async create(employeeData: Partial<Employee>): Promise<Employee> {
        const employee = this.employeeRepository.create(employeeData);
        return this.employeeRepository.save(employee);
    }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy({ id });
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }

    async findByName(name: string): Promise<Employee[]> {
        const employee = await this.employeeRepository.find({
            where: { name },
        });
        if (!employee.length) {
            throw new NotFoundException(`Employee with name ${name} not found`);
        }
        return employee;
    }

    // Like is case-sensitive, ILike is case-insensitive
    async searchByName(keyword: string): Promise<Employee[]> {
        return this.employeeRepository.find({
            where: {
                //name: Like(`%${keyword}%`)
                name: ILike(`%${keyword}%`)
            }
        });
    }

    async update(id: number, updateData: Partial<Employee>): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy({ id });
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        const updatedEmployee = Object.assign(employee,  updateData);
        return this.employeeRepository.save(updatedEmployee);
    }

    async delete(id: number): Promise<{ message: string }> {
        const result = await this.employeeRepository.delete({ id });
        if (result.affected === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        return { message: `Employee with ID ${id} deleted successfully` };
    }

}
