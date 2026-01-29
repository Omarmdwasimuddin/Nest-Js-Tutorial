import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
    private employees = [
        {id: 1101, name: 'Wasim', post: 'Software Engineer'},
        {id: 1102, name: 'Ismail', post: 'DevOps Engineer'},
        {id: 1103, name: 'Pranto', post: 'Network Engineer'},
        {id: 1104, name: 'Omar', post: 'T. Manager'},
    ];
    getAllEmployees(){
        return this.employees;
    }
    getEmployeeById(id: number){
        return this.employees.find((employee) => employee.id === id)
    }
}
