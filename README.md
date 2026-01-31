<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Checking-

```bash
# node version check
$ node -v

# npm version check
$ npm -v

# close
$ cls
```
## Installation Nest CLI

```bash
# nestjs cli installation
$ npm i -g @nestjs/cli

# nest project installation
$ nest new project-name
```
![installation img](/public/img/InstallNestjs.png)

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## node modules install (if you delete node_module & package-lock.json)
```bash
$ npm install 
# or,
$ npm i
```
---
Access Application
Visit: http://localhost:3000/ 

#### Keyboard Shortcuts
Ctrl + C - Stop running process / Return to previous path
---
## Topic 01: create controller
```bash
$ nest g controller [name]
```
![create controller](/public/img/createcontroller.png)

```bash
# user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```
```bash
# user.controller.ts
import { Controller } from '@nestjs/common';

@Controller('user')  //Decorator
export class UserController {

}
```
---
```bash
# user.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('user')  //Decorator
export class UserController {
    @Get()
    getUser(){
        return 'User data fetched successfully!'
    }
}
```
#### Output View
![output view](/public/img/output-view.png)
---

## Topic 02: create service
```bash
$ nest g service [name]
# Or,
$ nest g s [name]
```
---
![create service](/public/img/createservice.png)

```bash
# product.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```
```bash
# product.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {}
```
---
```bash
# product.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products = [
        {id: 1, name:"Mobile", price: 15000},
        {id: 2, name:"Laptop", price: 80000},
        {id: 3, name:"Tablet", price: 19000},
        {id: 4, name:"SSD", price: 12000},
        {id: 5, name:"DHR Camera", price: 27000},
    ];
    getAllProducts(){
        return this.products;
    }
    getProductById(id: number){
        return this.products.find((product) => product.id === id)
    }
}
```
---
```bash
# create product controller
$ nest g controller product
```
![product controller](/public/img/productcontroller.png)
```bash
# product.controller.spac.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```
---
```bash
# product.controller.ts
import { Controller } from '@nestjs/common';

@Controller('product')
export class ProductController {}
```
---
```bash
# product.controller.ts
import { Controller, Param, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}
        @Get()
        getProducts(){
            return this.productService.getAllProducts();
        }
        @Get(':id')
        getProduct(@Param('id') id:string){
            return this.productService.getProductById(Number(id))
        }
    
}
```
---
#### Output View
![product output](/public/img/output-view2.png)

## Topic 03: module

```bash
# create module
$ nest g module [name]
```
---
![create module](/public/img/createmodule.png)

```bash
#employee.module.ts
import { Module } from '@nestjs/common';

@Module({})
export class EmployeeModule {}
```
---
```bash
# create service
$ nest g service employee
```
```bash
# create controller
$ nest g controller employee
```
---
![create service & controller](/public/img/createservice&controller.png)

```bash
# employee.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('employee')
export class EmployeeController {
    @Get()
        getEmployee(){
            return 'Employee data fetched successfully!!'
        }
}
```
---
#### Output View
![output view](/public/img/output-view3.png)

```bash
# employee.service.ts
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
```
```bash
# employee.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService){}
    @Get()
        getEmployees(){
            return this.employeeService.getAllEmployees();
        }
    @Get(':id')
        getEmployee(@Param('id') id:string){
            return this.employeeService.getEmployeeById(Number(id))
        }
}
```
---
#### Output View
![output view](/public/img/output-view4.png)

## Topic 04: Dependency Injection

```bash
# create category module
$ nest g module category
# create service
$ nest g service category
# create controller
$ nest g controller category
```
---

```bash
# category.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
    getCategories(){
        return ['Mobile','Laptop','Tablet'];
    }
}
```
---

```bash
# category.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}
    @Get()
    getAllCategories(){
        return this.categoryService.getCategories();
    }
}
```
---
#### Output View
![output view](/public/img/output-view5.png)

## Topic 05: Create REST APIs

```bash
# create module
$ nest g module student
# create controller
$ nest g controller student
# create service
$ nest g service student
```
---
```bash
# student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = [
        { id:1, name: "Wasim", age:28 },
        { id:2, name: "Omar", age:29 },
    ];

    getAllStudents(){
        return this.students;
    }

    getStudentById(id: number){
        const student = this.students.find((s) => s.id === id)
        if(!student) throw new NotFoundException('Student not found!');
        return student;
    }

    // POST
    createStudent(data: {name: string; age: number}){
        const newStudent = {
            id: Date.now(),
            ...data,
        };
        this.students.push(newStudent);
        return newStudent;
    }

    // PUT
    updateStudent(id: number, data:{name:string; age:number}){
        const index = this.students.findIndex((s) => s.id === id);
        if( index === -1 ) throw new NotFoundException('Student not found!');
        this.students[index] = { id, ...data};
        return this.students[index];
    }

    // PATCH
    patchStudent(id: number, data: Partial<{ name: string; age: number}>){
        const student = this.getStudentById(id);
        Object.assign(student, data);
        return student;
    }

    // DELETE
    deleteStudent(id: number){
        const index = this.students.findIndex((s) => s.id === id);
        if( index === -1 ) throw new NotFoundException('Student not found!');
        const deleted = this.students.splice(index,1)
        return { message: 'student deleted successfully', student: deleted[0]};
    }

}
```
---

```bash
# student.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService){};

    @Get()
    getAll(){
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.studentService.getStudentById(Number(id))
    }

    @Post()
    create(@Body() data: {name: string; age: number}){
        return this.studentService.createStudent(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: {name: string; age: number}){
        return this.studentService.updateStudent(Number(id), data);
    }

    @Patch(':id')
    patch(@Param('id') id: string, @Body() data: Partial<{name: string; age: number}>){
        return this.studentService.patchStudent(Number(id), data);
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.studentService.deleteStudent(Number(id));
    }
}
```
---

#### Output View
- GET method
![Read](/public/img/output-view6.png)
- GET method with id
![Read](/public/img/output-view7.png)
- POST method 
![Read](/public/img/output-view8.png)
- PUT method
![Read](/public/img/output-view9.png)
- PATCH method
![Read](/public/img/output-view10.png)
- DELETE method
![Read](/public/img/output-view11.png)


## Topic 06: Data Transfer Object (DTO) & Interfaces

```bash
# create module
$ nest g module customer
# create controller
$ nest g controller customer
# create service
$ nest g service customer
```
---
```bash
#create dto & interfaces folder
```
![folder create](/public/img/folder.png)
![folder create](/public/img/folder2.png)

```bash
# customer.interface.ts
export interface Customer{
    id: number;
    name: string;
    age: number;
}
```
---
```bash
# create-customer.dto.ts
export class CreateCustomerDto {
    name: string;
    age: number;
}
```
---
```bash
# customer.service.ts
import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    private customers: Customer[] = [];

    getAllCustomers(): Customer[] {
        return this.customers;
    }

    addCustomer(createCustomerDto: CreateCustomerDto): Customer {
        const newCustomer: Customer = {
            id: Date.now(),
            ...createCustomerDto
        };
        this.customers.push(newCustomer);
        return newCustomer;
    }

}
```
---
```bash
# customer.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {};

    @Get()
    getCustomers(){
        return this.customerService.getAllCustomers();
    }

    @Post()
    addCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.addCustomer(createCustomerDto);
    }

}
```
---

#### Output View
- GET
![get](/public/img/output-view13.png)
- POST
![post](/public/img/output-view12.png)


## Topic 07: Validate DTOs Using class-validator & class-transformer

![create-customer.dto.ts file](/public/img/dto-file.png)
![postman](/public/img/validation.png)