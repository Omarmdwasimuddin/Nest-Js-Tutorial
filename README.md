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
###### Note: node modules install (if you delete node_module & package-lock.json)
```bash
$ npm install 
# or,
$ npm i
```
---
Access Application
Visit: http://localhost:3000/ 

#### Keyboard Shortcuts
###### Ctrl + C - Stop running process / Return to previous path
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

```bash
# Validate command
$ npm i class-validator class-transformer
```
---

```bash
# create-customer.dto.ts
import { IsInt, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    name: string;
    @IsInt()
    age: number;
}
```
---
```bash
# main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```
---

![extra field not working](/public/img/extrafield.png)


## Topic 08: Create & Use Custom Pipes

```bash
# create pipes
$ nest g pipe [name]
```
---
```bash
# create pipes with folder
$ nest g pipe common/pipes/uppercase
```
---

![file folder](/public/img/filefolder.png)

```bash
# uppercase.pipe.spec.ts 
import { UppercasePipe } from './uppercase.pipe';

describe('UppercasePipe', () => {
  it('should be defined', () => {
    expect(new UppercasePipe()).toBeDefined();
  });
});
```
---

```bash
# uppercase.pipe.ts 
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```
---

```bash
# uppercase.pipe.ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  }
}
```

```bash
# create controller
$ nest g controller myname
```
---

```bash
# myname.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('myname')
export class MynameController {
    @Post('custom')
    transformName(@Body('name', new UppercasePipe()) name: string) {
        return { message: `Hello ${name}!` };
    }
}
```
---
###### Note: Headers e Content-Type application/json add korte hobe
![output view](/public/img/output-view14.png)
![output view](/public/img/output-view15.png)


## Topic 09: How to Protect Routes using Guards

```bash
# create guard
$ nest g guard [name]
```
---
```bash
# create guard with folder
$ nest g guard guards/auth
```
---
![guard folder](/public/img/guardfolder.png)

```bash
# auth.guard.spec.ts
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
```
---

```bash
# auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```
---

```bash
# auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    return authHeader === 'Bearer my-secret-token'
  }
}
```
---
 
###### Note: product path e AuthGuard setup

```bash
# product.controller.ts
import { Controller, Param, Get, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}
        @Get()
        @UseGuards(AuthGuard)
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
###### Note: Headers e token set na kore dile value show hobe na
![output](/public/img/output-view16.png)

###### Note: Headers e token set kore dite hobe tai Headers e Authorization e Bearer my-secret-token diye dibo

![output](/public/img/output-view17.png)


## Topic 10: Role-Based Authorization

```bash
# create guard
$ nest g guard [name]
# create guard with path
$ nest g guard guards/roles
```
---
![folder](/public/img/guardfolderrole.png)

```bash
# roles.guard.spec.ts
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('should be defined', () => {
    expect(new RolesGuard()).toBeDefined();
  });
});
```
---
```bash
# roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```
---

###### Note: Add file- roles.decorator.ts & roles.enums.ts 
![add newfile](/public/img/fileadd.png)

```bash
# roles.decorator.ts
// Custom decorator
import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```
---

```bash
# roles.enums.ts
export enum Role {
    User = 'user',
    Admin = 'admin'
}
```
---

```bash
# roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.enums';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,[
        context.getHandler(),
        context.getClass(),
      ]
    );
    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string>}>();
    const userRole = request.headers['x-user-role'] as Role;
    return requiredRoles.includes(userRole);
  }
}
```
---

```bash
# create controller
$ nest g controller user-roles
```
---

```bash
# user-roles.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enums';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('user-roles')
export class UserRolesController {

    @Get('admin-data')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    getAdminData(){
        return { message: "Only Admins can access this data" };
    }
    @Get('user-data')
    getUserData(){
        return { message: "Any authenticated user can access this data" };
    }

}
```
---
![postman](/public/img/cannotaccessanyone.png)
###### Note: headers e x-user-role dite hobe & value dite hobe ekhane value hishabe admin ache
![postman](/public/img/admincanaccess.png)
###### Note: jekono user ei access korte parbe
![postman](/public/img/anyonecanaccess.png)

## Topic 11:  Exception Filters

```bash
# create filter
$ nest g filter filters/http-exception
```
---
![filter folder](/public/img/exceptionfolder.png)

```bash
# http-exception.filter.spec.ts
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
```
---

```bash
# http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
```
---

```bash
# http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message
    });
  }
}
```
---

```bash
# create controller
$ nest g controller exception
```
---
![exception folder](/public/img/exceptionfolder2.png)

```bash
# exception.controller.ts
import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('exception')
@UseFilters(HttpExceptionFilter)
export class ExceptionController {
    @Get('hello/:id')
    getHello(@Param('id', ParseIntPipe) id: number) {
        return {message: `Your ID is ${id}`}
    }
}
```
---
###### Note: id must be number dite hobe
![output view](/public/img/output-view18.png)
###### Note: string dile id show hobe na 
![output view](/public/img/output-view19.png)


## Topic 12: Middleware

```bash
# create middleware
$ nest g middleware middleware/logger
```
---

```bash
# logger.middleware.spec.ts
import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerMiddleware()).toBeDefined();
  });
});
```
---

```bash
# logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
```
---
![middleware](/public/img/middleware.png)

```bash
# logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request: [${req.method}] - [${req.originalUrl}]`);
    next();
  }
}
```
---

```bash
# app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

@Module({
  imports: [EmployeeModule, CategoryModule, StudentModule, CustomerModule],
  controllers: [AppController, UserController, ProductController, MynameController, UserRolesController, ExceptionController],
  providers: [AppService, ProductService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  } 
}
```
---

## Topic 13: Life Cycle Hooks

```bash
# create service
$ nest g service database
# create controller
$ nest g controller database
```
---

###### Note: life cycle method start hoi on diye jemon onModuleInit, onApplicationShutdown etc.

```bash
# database.service.ts
import { Injectable, OnModuleInit, OnApplicationShutdown, } from '@nestjs/common';

@Injectable()
export class DatabaseService
  implements OnModuleInit, OnApplicationShutdown
{
  private isConnected = false;

  onModuleInit() {
    this.isConnected = true;
    console.log('Database Connected!');
  }

  onApplicationShutdown(signal: string) {
    this.isConnected = false;
    console.log(`Database Disconnected! signal: ${signal}`);
  }

  getStatus() {
    return this.isConnected ? 'Connected' : 'Disconnected';
  }
}
```
---

###### Note: main.ts e add koro app.enableShutdownHooks();

```bash
# main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
  app.enableShutdownHooks();
}
bootstrap();
```
---

```bash
# database.controller.ts
import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get('status')
    getStatus() {
        return this.databaseService.getStatus();
    }

}
```
---
###### npm run start:dev
![output view](/public/img/tarminal%20view.png)
###### ctrl c
![output view](/public/img/terminal%20view.png)

## Topic 14: Environment Variables

```bash
# install @nestjs/config
$ npm i @nestjs/config
```
---
###### root e .env file toiri koro

```bash
# .env
DATABASE_URL=mongodb://localhost:500/mongodb
JWT_SECRET=1234567
```
---

###### Module e import koro- ConfigModule.forRoot
```bash
# app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EmployeeModule, CategoryModule, StudentModule, CustomerModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController, UserController, ProductController, MynameController, UserRolesController, ExceptionController, DatabaseController],
  providers: [AppService, ProductService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  } 
}
```
---

```bash
# create service
$ nest g service ev
```
---

```bash
# ev.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EvService {
    constructor(private configService: ConfigService) {}

    getDbUrl() {
        return this.configService.get<string>('DATABASE_URL');
    }
}
```
---

```bash
# create controller
$ nest g controller ev
```
---


```bash
# ev.controller.ts
import { Controller, Get } from '@nestjs/common';
import { EvService } from './ev.service';

@Controller('ev')
export class EvController {
    constructor(private readonly evService: EvService) {}
    @Get()
    getUrl() {
        return this.evService.getDbUrl();
    }
}
```
---
![env data response](/public/img/envoutput.png)

## Topic 15: Connect NestJS App with MongoDB Atlas

###### Note: browse- https://www.mongodb.com/cloud/atlas/register account create koro, clusters create koro .env te database connect koro.

```bash
# .env
MONGO_URL=mongodb+srv://mdwasimu015_db_user:KSavMq0fMHVqQUQF@cluster0.kt25fpa.mongodb.net/?appName=Cluster0
mongodbPassword=KSavMq0fMHVqQUQF
```
---

```bash
# install mongoose
$ npm i @nestjs/mongoose mongoose
```
---

###### Note: app.module.ts file e add koro- import { MongooseModule } from '@nestjs/mongoose';   &   imports: [EmployeeModule, CategoryModule, StudentModule, CustomerModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URL!)],  also note: app.module.ts file dekhe korte hobe github e .env er properties onno file thekeo hide kore dey!!!

```bash
# app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';
import { EvService } from './ev/ev.service';
import { EvController } from './ev/ev.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [EmployeeModule, CategoryModule, StudentModule, CustomerModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URL!)],
  controllers: [AppController, UserController, ProductController, MynameController, UserRolesController, ExceptionController, DatabaseController, EvController],
  providers: [AppService, ProductService, DatabaseService, EvService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  } 
}
```
---
###### npm run start:dev dile jodi error ashe tahole mongodb connect hoinai ar na ashle thikache.


## Topic 16: How to Create & Register Schema with Mongoose

```bash
# create module
$ nest g module students
```
---
###### manualy file banao students.schema.ts
![students folder](/public/img/studentsfolder.png)

```bash
# students.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StudentDocument = Student & Document;

@Schema( { timestamps: true } )
export class Student {
    @Prop( { required: true } )
    name: string;
    
    @Prop( { required: true } )
    age: number;

    @Prop()
    email?: string;
}

export const StudentSchema = SchemaFactory.createForClass( Student );
```
---

```bash
# students.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './students.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])]
})
export class StudentsModule {

}
```
---

```bash
# create service
$ nest g service students
# create controller
$ nest g controller students
```
---

```bash
# students.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './students.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    ) {}

    async createStudent(data: Partial<Student>): Promise<Student> {
        const newStudent = new this.studentModel(data);
        return newStudent.save();
    }
}
```
---

```bash
# students.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './students.schema';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Post()
    async createStudent(@Body() data: Partial<Student>) {
        return this.studentsService.createStudent(data);
    }
}
```
---
###### postman
![output view](/public/img/outputmongo.png)
###### mongodb insert data
![output view](/public/img/mongodb.png)

## Topic 17: Get Data from MongoDB using find() & findById()

```bash
# students.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './students.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    ) {}

    async createStudent(data: Partial<Student>): Promise<Student> {
        const newStudent = new this.studentModel(data);
        return newStudent.save();
    }

    async getAllStudents(): Promise<Student[]> {
        return this.studentModel.find().exec();
    }

    async getStudentById(id: string): Promise<Student | null> {
        return this.studentModel.findById(id).exec();
    }

}
```
---

```bash
# students.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './students.schema';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Post()
    async createStudent(@Body() data: Partial<Student>) {
        return this.studentsService.createStudent(data);
    }

    @Get()
    async getAllStudents() {
        return this.studentsService.getAllStudents();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: string) {
        return this.studentsService.getStudentById(id);
    }
}
```
---

![read allStudent](/public/img/allstudentoutput.png)
###### search by id
![search by id](/public/img/searchId.png)


## Topic 18: Update MongoDB Data using PUT API & findByIdAndUpdate


```bash
# students.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './students.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    ) {}

    async createStudent(data: Partial<Student>): Promise<Student> {
        const newStudent = new this.studentModel(data);
        return newStudent.save();
    }

    async getAllStudents(): Promise<Student[]> {
        return this.studentModel.find().exec();
    }

    async getStudentById(id: string): Promise<Student | null> {
        return this.studentModel.findById(id).exec();
    }

    async updateStudent(id: string, data: Partial<Student>): Promise<Student | null> {
        return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

}
```
---

```bash
# students.controller.ts
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './students.schema';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Post()
    async createStudent(@Body() data: Partial<Student>) {
        return this.studentsService.createStudent(data);
    }

    @Get()
    async getAllStudents() {
        return this.studentsService.getAllStudents();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: string) {
        return this.studentsService.getStudentById(id);
    }

    @Put(':id')
    async updateStudent(@Param('id') id: string, @Body() data: Partial<Student>) {
        return this.studentsService.updateStudent(id, data);
    }

}
```
---
###### partialy data update
![update](/public/img/studentsupdate.png)
###### mongodb
![update](/public/img/mongodb2.png)


## Topic 19: Update MongoDB Data using PATCH API, DELETE & PUT

```bash
# students.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './students.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    ) {}

    async createStudent(data: Partial<Student>): Promise<Student> {
        const newStudent = new this.studentModel(data);
        return newStudent.save();
    }

    async getAllStudents(): Promise<Student[]> {
        return this.studentModel.find().exec();
    }

    async getStudentById(id: string): Promise<Student | null> {
        return this.studentModel.findById(id).exec();
    }

    // Complete update with overwrite
    async updateStudent(id: string, data: Partial<Student>): Promise<Student | null> {
       // return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
       const update = await this.studentModel.findByIdAndUpdate(id, {
        name: data.name ?? null,
        age: data.age ?? null,
        email: data.email ?? null,
       }, { overwrite: true, new: true });
       return update;
    }

    // Partial update
    async patchStudent(id: string, data: Partial<Student>): Promise<Student | null> {
        return this.studentModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
    }

    async deleteStudent(id: string): Promise<Student | null> {
        return this.studentModel.findByIdAndDelete(id).exec();
    }

}
```
---

```bash
# students.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './students.schema';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Post()
    async createStudent(@Body() data: Partial<Student>) {
        return this.studentsService.createStudent(data);
    }

    @Get()
    async getAllStudents() {
        return this.studentsService.getAllStudents();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: string) {
        return this.studentsService.getStudentById(id);
    }

    @Put(':id')
    async updateStudent(@Param('id') id: string, @Body() data: Partial<Student>) {
        return this.studentsService.updateStudent(id, data);
    }

    @Delete(':id')
    async deleteStudent(@Param('id') id: string) {
        return this.studentsService.deleteStudent(id);
    }

    @Patch(':id')
    async patchStudent(@Param('id') id: string, @Body() data: Partial<Student>) {
        return this.studentsService.patchStudent(id, data);
    }

}
```
---
###### Partial update
![patch](/public/img/patch.png)
###### Partially update korle PUT method baki properties gulote value null ashbe
![patch](/public/img/put.png)
###### Complete update
![patch](/public/img/put2.png)
###### Delete
![patch](/public/img/delete.png)


## Topic 20: One-to-One Relationship using Embedding in MongoDB

```bash
# create module
$ nest g module users
# create service
$ nest g service users
# create controller
$ nest g controller users
```
---

###### manually toiry koro- schemas/address.schema.ts   o  schema/user.schema.ts
![schemas folder](/public/img/schemasfolder.png)

```bash
# address.schema.ts
import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Address {
  @Prop()
  street: string;

  @Prop()
  city: string;
}
```
---

```bash
# user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Address } from "./address.schema";


@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop( { type: Address } )
  address: Address;

}
export const UserSchema = SchemaFactory.createForClass(User);
```
---
###### user.module.ts e import koro- MongooseModule 
```bash
# users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
```
---

```bash
# users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(): Promise<User> {
        const user = new this.userModel({
            name: 'John Doe',
            address: {
                street: '123 Main St',
                city: 'Anytown'
            }
        });
        return user.save();
    }

    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
```
---

```bash
# users.controller.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(): Promise<User> {
        const user = new this.userModel({
            name: 'John Doe',
            address: {
                street: '123 Main St',
                city: 'Anytown'
            }
        });
        return user.save();
    }

    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
```
---
![post](/public/img/userspost.png)
![get](/public/img/usersget.png)
![mongoose](/public/img/mongoose.png)


## Topic 21: One-to-One Relationship using Referencing in MongoDB


```bash
# create-
$ nest g module staff
$ nest g service staff
$ nest g controller staff
```
---
###### folder & file create koro- schemas/profile.schema.ts & schemas/staff.schema.ts

```bash
# profile.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Profile extends Document {
    @Prop()
    age: number;

    @Prop()
    qualification: string;

    @Prop()
    experience: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
```
---

```bash
# staff.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Profile } from "./profile.schema";

@Schema()
export class Staff extends Document {
    @Prop()
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile' })
    profile: Profile
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
```
---

```bash
# staff.module.ts
import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './schemas/staff.schema';
import { Profile, ProfileSchema } from './schemas/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Staff.name, schema: StaffSchema },
      { name: Profile.name, schema: ProfileSchema }
    ]),
  ],
  providers: [StaffService],
  controllers: [StaffController]
})
export class StaffModule {}
```
---

```bash
# staff.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Staff } from './schemas/staff.schema';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<Staff>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createStaff(): Promise<Staff> {

    const profile = await new this.profileModel({
      age: 30,
      qualification: "MBA",
      experience: 5,
    }).save();

    const staff = new this.staffModel({
      name: "John Doe",
      profile: profile._id,
    });

    return staff.save();
  }

  async findAll(): Promise<Staff[]> {
    return this.staffModel.find().populate('profile').exec();
  }
}
```
---

```bash
# staff.controller.ts
import { Controller, Get, Post } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) {}

    @Post()
    async createStaff() {
      return this.staffService.createStaff();
    }

    @Get()
    async findAll() {
      return this.staffService.findAll();
    }

}
```
---
######
![post](/public/img/staffpost.png)
![get](/public/img/staffget.png)
![mongoose](/public/img/staffmongoose.png)


## Topic 22: One-to-Many Relationship using Embedding in MongoDB


```bash
# create-
$ nest g module products
$ nest g service products
$ nest g controller products
```
---
###### create file folder- schemas/tag.schema.ts & schemas/products.schema.ts
```bash
# tag.schema.ts
import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
export class Tag {
    @Prop()
    name: string;
}
```
---

```bash
# products.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Tag } from "./tag.schema";

@Schema()
export class Product extends Document {
    @Prop()
    title: string;

    @Prop( {type: [Tag]} )
    tag: Tag[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
```
---

```bash
# products.module.ts
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/products.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ])
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
```
---

```bash
# products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}

    async createProducts(): Promise<Product> {
        const product = new this.productModel({
            title: 'Gaming Laptop',
            tag: [
                { name: 'Electronics' },
                { name: 'Laptop' },
                { name: 'Gaming' },
            ],
        });
        return product.save();
    }

    async getProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
```
---

```bash
# products.controller.ts
import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    createProducts() {
        return this.productsService.createProducts();
    }

    @Get()
    getProducts() {
        return this.productsService.getProducts();
    }
}
```
---

![post](/public/img/productspost.png)
![get](/public/img/productsget.png)
![products mongoose](/public/img/productsmongoose.png)


## Topic 23: One-to-Many Relationship using Referencing in MongoDB


```bash
# create-
$ nest g module library
$ nest g service library
$ nest g controller library
```
---

###### create file folder- schemas/library.schema.ts & schemas/book.schema.ts

```bash
# book.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Book extends Document {
    @Prop()
    title: string;

    @Prop()
    author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
```
---

```bash
# library.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Book } from "./book.schema";



@Schema()
export class Library extends Document {
    @Prop()
    name: string;

    @Prop( {
        type: [{ type: Types.ObjectId, ref: Book.name}],
    } )
    books: Types.ObjectId[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
```
---

```bash
# library.module.ts
import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Library, LibrarySchema } from './schemas/library.schema';
import { Book, BookSchema } from './schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Library.name, schema: LibrarySchema },
      { name: Book.name, schema: BookSchema }
    ])
  ],
  providers: [LibraryService],
  controllers: [LibraryController]
})
export class LibraryModule {}
```
---

```bash
# library.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { Library } from './schemas/library.schema';

@Injectable()
export class LibraryService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>,
        @InjectModel(Library.name) private libraryModel: Model<Library>
    ) {}

    async createLibrary(): Promise<Library> {

        const book1 = await this.bookModel.create({ 
            title: 'JS Library', 
            author: 'Hamid' 
        });
        const book2 = await this.bookModel.create({
             title: 'HTML Library', 
             author: 'Rafiq' 
            });
        const book3 = await this.bookModel.create({
             title: 'CSS Library', 
             author: 'Manna' 
            });

        const library = new this.libraryModel({
             name: 'Central Library', 
             books: [book1._id, book2._id, book3._id] 
            });
        return library.save();
    }

    async getLibrary(): Promise<Library[]> {
        return this.libraryModel.find().populate('books').exec();
    }
}
```
---

```bash
# library.controller.ts
import { Controller, Get, Post } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    constructor(private readonly libraryService: LibraryService) {}

    @Post()
    createLibrary() {
        return this.libraryService.createLibrary();
    }

    @Get()
    getLibrary() {
        return this.libraryService.getLibrary();
    }
}
```
---

![post](/public/img/librarypost.png)
![post](/public/img/libraryget.png)

![post](/public/img/librarymongoose.png)
![post](/public/img/booksmongoose.png)
 

## Topic 24: Many-to-Many Relationship using Referencing in MongoDB

```bash
# create-
$ nest g module project
$ nest g service project
$ nest g controller project
```
---

###### create koro file folder- schemas/developer.schema.ts & schemas/project.schema.ts

```bash
# developer.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


@Schema({ timestamps: true })
export class Developer extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] })
  projects: Types.ObjectId;

}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);
```
---

```bash
# project.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


@Schema({ timestamps: true })
export class Project extends Document {

  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Developer' }] })
  developers: Types.ObjectId;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);
```
---

```bash
# project.module.ts
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Developer, DeveloperSchema } from './schemas/developer.schema';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
      { name: Project.name, schema: ProjectSchema }
    ])
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
```
---

```bash
# project.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from './schemas/developer.schema';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Developer.name) private developerModel: Model<Developer>,
        @InjectModel(Project.name) private projectModel: Model<Project>,
    ) {}

    async seed(): Promise<{ dev1: Developer; dev2: Developer }> {
        const [projectA, projectB] = await Promise.all([
            this.projectModel.create({ title:  'NestJS CRM'}),
            this.projectModel.create({ title:  'MongoDB Analytics'}),
        ]);

        const [dev1, dev2] = await Promise.all([
            this.developerModel.create({ name: 'Alice', projects: projectA._id }),
            this.developerModel.create({ name: 'Bob', projects: projectB._id }),
        ]);

        await Promise.all([
            this.projectModel.findByIdAndUpdate(projectA._id, { $set: { developers: [dev1._id] } }),
            this.projectModel.findByIdAndUpdate(projectB._id, { $set: { developers: [dev2._id] } }),
        ])
        return { dev1, dev2 };
    }

    async getDevelopers(): Promise<Developer[]> {
        return this.developerModel.find().populate('projects').lean();
    } 

    async getProjects(): Promise<Project[]> {
        return this.projectModel.find().populate('developers').lean();
    }

}
```
---

```bash
# project.controller.ts
import { Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post('seed')
    async seedData() {
        return this.projectService.seed();
    }

    @Get('developers')
    async getDevelopers() {
        return this.projectService.getDevelopers();
    }

    @Get('projects')
    async getProjects() {
        return this.projectService.getProjects();
    }
}
```
---

![](/public/img/projectpost.png)
![](/public/img/projectget.png)
![](/public/img/projectget2.png)


## Topic 25: Connect Supabase PostgreSQL with NestJS

###### supabase dashboard theke New project create koro & database ke project er shathe connect koro. session pooler theke url connect koro.

![session pooler](/public/img/Sessionpooler.png)
![connect pooler](/public/img/connectionpooler.png)

```bash
# .env
DATABASE_URL=postgresql://postgres.tpawbhcettriiskwfjwl:q5Ml5Z4fMLqnsgzT@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres
```
---

```bash
# install for env configuration
$ npm i @nestjs/config
# install postgreesql
$ npm install @nestjs/typeorm typeorm pg
```
---

```bash
# create module,
$ nest g module user-bd
```
---

###### user.entity.ts file create koro.

```bash
# user.entity.ts
import {  Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

    @Column()
    name: string;
}
```
---

```bash
# user-bd.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([User]) ],
})
export class UserBdModule {}
```
---

###### app.module.ts file e add koro- ConfigModule.forRoot(), TypeOrmModule.forRoot({ type: 'postgres', url: process.env.DATABASE_URL, autoLoadEntities: true, synchronize: true, }),

```bash
# app.module.ts 
# ekhane ager project er module o add ache tai ei code ato boro
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';
import { EvService } from './ev/ev.service';
import { EvController } from './ev/ev.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { StaffModule } from './staff/staff.module';
import { ProductsModule } from './products/products.module';
import { LibraryModule } from './library/library.module';
import { ProjectModule } from './project/project.module';
import { UserBdModule } from './user-bd/user-bd.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
  }), UserBdModule],
  controllers: [AppController, UserController, ProductController, MynameController, UserRolesController, ExceptionController, DatabaseController, EvController],
  providers: [AppService, ProductService, DatabaseService, EvService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  } 
}
```
---

## Topic 26:  Insert Data into Supabase PostgreSQL

```bash
# create-
$ nest g module employee-bd
$ nest g service employee-bd
$ nest g controller employee-bd
```
---
###### file add koro- employees.entity.ts
```bash
# employees.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    position: string;

    @Column()
    department: string;

    @Column()
    salary: number;
}
```
---

```bash
# employee-bd.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeBdService {
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    ) {}

    async create(employeeData: Partial<Employee>): Promise<Employee> {
        const employee = this.employeeRepository.create(employeeData);
        return this.employeeRepository.save(employee);
    }
}
```
---

```bash
# employee-bd.controller.ts
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
```
---
###### Note: add- imports: [TypeOrmModule.forFeature([Employee])],

```bash
# employee-bd.module.ts
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
```
---
###### Output view
![](/public/img/employeebdpostman.png)
![](/public/img/employeebdsupabase.png)


## Topic 27: Fetch Data from Supabase PostgreSQL

```bash
# employee-bd.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { Repository } from 'typeorm';

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

}
```
---

```bash
# employee-bd.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get(':id')
    async findEmployeeById(@Param('id') id: number): Promise<Employee> {
        return this.employeeBdService.findOne(id);
    }

}
```
---

![](/public/img/findAll.png)
![](/public/img/findById.png)

## Topic Extra: search-by name, keyword, partial keyword

```bash
# employee-bd.service.ts
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

}
```
---

```bash
# employee-bd.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

}
```
---
![](/public/img/findbyname.png)
![](/public/img/searchByKeyword.png)

## Topic 28: Update Data in Supabase PostgreSQL

```bash
# employee-bd.service.ts
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

}
```
---

```bash
# employee-bd.controller.ts
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

}
```
---

![](/public/img/update.png)

## Topic 29: Delete Data from Supabase PostgreSQL Database

```bash
# employee-bd.service.ts
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
```
---

```bash
# employee-bd.service.ts
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
```
---

![](/public/img/delete-employee.png)


## Topic 30: Filter & Search Data Using @Query()

```bash
# employee-bd.service.ts
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

    async search(filters: { name?: string; department?: string }): Promise<Employee[]> {
        const query = this.employeeRepository.createQueryBuilder('employee');

        if (filters.name) {
            query.andWhere('employee.name ILIKE :name', { name: `%${filters.name}%`});
        }
        if (filters.department){
            query.andWhere(`employee.department ILIKE :department`, { department: `%${filters.department}%`});
        }
        return query.getMany();
    }

}
```
---

###### Note: Get method er modhe id er agei filter dite hobe na hole filter kaj korbe na. code ta dekhle clear hoye jabe

```bash
# employee-bd.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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

    @Get('filter')
    async filterEmployees(
        @Query('name') name?: string,
        @Query('department') department?: string,
    ): Promise<Employee[]> {
        return this.employeeBdService.search({ name, department });
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
```
---

![](/public/img/filter.png)

## Topic 31: Supabase JWT Authentication with Login API

```bash
# Install-
$ npm i jsonwebtoken
```
---
###### Note: project settings theke JWT Keys theke Legacy JWT Secret keys Reveal kore copy koro
![](/public/img/projectsettings.png)
![](/public/img/copyjwt.png)

```bash
# .env
DATABASE_URL=postgresql://postgres.tpawbhcettriiskwfjwl:q5Ml5Z4fMLqnsgzT@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres
SUPABASE_JWT_SECRET=T+sfZYNnyCfjlXvUwS9gh2FD/l/fZjYqDNi79DnbWwdWdLvPFmLE0W7Jt0PJ9v2YhO7mpobrxm0Ti1Klhyr6MA==
```
---
###### Note: add koro- ConfigModule.forRoot({isGlobal: true,}) 

```bash
# app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';
import { UserBdModule } from './user-bd/user-bd.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeBdModule } from './employee-bd/employee-bd.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
  }), UserBdModule, EmployeeBdModule],
  controllers: [AppController, UserController, ProductController, MynameController, UserRolesController, ExceptionController, DatabaseController ],
  providers: [AppService, ProductService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  } 
}
```
---

```bash
# create-
$ nest g guard auth/supabase-auth
```
---

```bash
# supabase-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SupabaseAuthGuard implements CanActivate {

  constructor(
    private configService: ConfigService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    const jwtSecret = this.configService.get<string>('SUPABASE_JWT_SECRET');
    if (!jwtSecret) {
      throw new UnauthorizedException('JWT secret not configured');
    }
    try {
     const decode = jwt.verify(token, jwtSecret);
     request['user'] = decode; // Attach decoded token to request object
     return true;
    }
    catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```
---

###### add- @UseGuards(SupabaseAuthGuard)

```bash
# employee-bd.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EmployeeBdService } from './employee-bd.service';
import { Employee } from './employees.entity';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('employee-bd')
export class EmployeeBdController {
    constructor(private readonly employeeBdService: EmployeeBdService) {}

    @Post()
    async createEmployee(@Body() employeeData: Partial<Employee>) {
        return this.employeeBdService.create(employeeData);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get()
    async findAllEmployees(): Promise<Employee[]> {
        return this.employeeBdService.findAll();
    }

    @Get('filter')
    async filterEmployees(
        @Query('name') name?: string,
        @Query('department') department?: string,
    ): Promise<Employee[]> {
        return this.employeeBdService.search({ name, department });
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
```
---
###### click authentication
![](/public/img/authentication.png)
###### click create new user
![](/public/img/createnewuser.png)
###### create new user
![](/public/img/createuser.png)
###### created
![](/public/img/created.png)
###### copy project ID
![](/public/img/projectID.png)
###### postman e project id url e boshao
![](/public/img/projectidfromUrl.png)
###### url e add koro- .supabase.co/auth/v1/token?grant_type=password   abong Body daw
![](/public/img/body.png)
###### api key copy koro-
![](/public/img/apikey.png)
###### Headers e apikey ar Content-Type daw
![](/public/img/header.png)
###### Send click koro-
![](/public/img/Send.png)
###### Authorization e Bearer(space diye) token add koro- then Send click koro-
![](/public/img/authorization.png)


## Topic 32: JWT Authentication with MongoDB

```bash
# install- 
$ npm i @nestjs/jwt passport-jwt @nestjs/passport passport
$ npm i bcrypt
$ npm i --save-dev @types/bcrypt
```
---

```bash
# create-
$ nest g module auth
$ nest g service auth
$ nest g controller auth
$ nest g class auth/user.schema --flat
```
---

```bash
# user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = UserSchema & Document;

@Schema()
export class UserSchema {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
```
---

```bash
# .env
# DATABASE_URL=postgresql://postgres.tpawbhcettriiskwfjwl:q5Ml5Z4fMLqnsgzT@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres
# SUPABASE_JWT_SECRET=T+sfZYNnyCfjlXvUwS9gh2FD/l/fZjYqDNi79DnbWwdWdLvPFmLE0W7Jt0PJ9v2YhO7mpobrxm0Ti1Klhyr6MA==

# .env
MONGO_URL=mongodb+srv://mdwasimu015_db_user:KSavMq0fMHVqQUQF@cluster0.kt25fpa.mongodb.net/?appName=Cluster0
# mongodbPassword=KSavMq0fMHVqQUQF

JWT_SECRET=wasim123secretkey
```
---

```bash
# auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaFactory, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserSchema.name, schema: UserSchemaFactory}]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService)=> ({
      secret: config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1h' },
    })
  })
],
  providers: [AuthService, JwtStrategy], ##add-koro-JwtStrategy
  controllers: [AuthController]
})
export class AuthModule {}

```
---
###### auth/jwt.strategy.ts file create koro
```bash
# jwt.strategy.ts
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>("JWT_SECRET"),
        });
    }
    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}
```
---

```bash
# auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserSchema.name) private userModel: Model<UserDocument>, private jwtService: JwtService,
    ) {}

    async signup(email: string, password: string) {
        const hash = await bcrypt.hash(password,10);
        const user = new this.userModel({ email, password: hash });
        await user.save();
        return { message: 'User created successfully' };
        // return user.save();
    }
    
    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
```
---

```bash
# auth.controller.ts
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() body: { email: string; password: string }) {
        return this.authService.signup(body.email, body.password);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
```
---

```bash
# app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';
import { UserBdModule } from './user-bd/user-bd.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeBdModule } from './employee-bd/employee-bd.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
  }), MongooseModule.forRoot(process.env.MONGO_URL!), UserBdModule, EmployeeBdModule, AuthModule],
  controllers: [AppController, UserController, ProductController, MynameController, UserRolesController, ExceptionController, DatabaseController ],
  providers: [AppService, ProductService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  } 
}
```
---
![](/public/img/usercreated.png)
![](/public/img/userSchema.png)
![](/public/img/userlogin.png)
![](/public/img/auth.png)

## Topic 33:  Build Full GraphQL CRUD App with MongoDB & NestJS

```bash
# install
$ npm i @nestjs/graphql @nestjs/apollo @apollo/server @as-integrations/express5 class-transformer class-validator graphql
```
---

```bash
# create-
$ nest g module book
$ nest g service book
$ nest g resolver book/resolvers/book --flat
```
---

##### file-folder create koro- book/dto/create-book.input.ts , book/dto/update-book.input.ts & book/model/book.model.ts

###### app.module.ts e add koro- imports: [ ConfigModule.forRoot({isGlobal: true,}), GraphQLModule.forRoot<ApolloDriverConfig>({driver: ApolloDriver,autoSchemaFile: join(process.cwd(), 'src/schema.gql'),sortSchema: true,playground: true,}), MongooseModule.forRoot(process.env.MONGO_URL!),]

```bash
# app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';
import { UserBdModule } from './user-bd/user-bd.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeBdModule } from './employee-bd/employee-bd.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }), GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: true,
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
  }), MongooseModule.forRoot(process.env.MONGO_URL!), UserBdModule, EmployeeBdModule, AuthModule, BookModule],
  controllers: [AppController, UserController, ProductController, MynameController, UserRolesController, ExceptionController, DatabaseController ],
  providers: [AppService, ProductService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  } 
}
```
---

```bash
# book.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Book {
    @Field(() => ID)
    _id: string;

    @Prop({ required: true })
    @Field()
    title: string;

    @Prop()
    @Field({ nullable: true })
    description?: string;

    @Prop({ required: true })
    @Field()
    author: string;
}

export type BookDocument = HydratedDocument<Book>;
export const BookSchema = SchemaFactory.createForClass(Book);
```
---

```bash
# book.module.ts
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './resolvers/book.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './model/book.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  providers: [BookService, BookResolver]
})
export class BookModule {}
```
---

```bash
# create-book.input.ts
import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateBookInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Field({ nullable: true })
    @IsString()
    description?: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    author: string;
}
```
---

```bash
# update-book.input.ts 
import { CreateBookInput } from "./create-book.input";
import { InputType, Field, PartialType, ID } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
    @Field(() => ID)
    @IsNotEmpty()
    id: string;
}
```
---

```bash
# book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';


@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>
    ) {}

    async create(input: CreateBookInput): Promise<Book> {
        const created = new this.bookModel(input);
        return created.save();
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async findOne(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id).exec();
        if (!book) throw new NotFoundException('Book not found!')
        return book;
    }

    async update(input: UpdateBookInput): Promise<Book> {
        const existingBook = await this.bookModel.findById(input.id);
        if (!existingBook) throw new NotFoundException('Book not found!');

        Object.assign(existingBook, input);
        return existingBook.save();
    }

    async delete(id: string): Promise<boolean> {
        const deletedBook = await this.bookModel.findByIdAndDelete(id);
        if (!deletedBook) throw new NotFoundException('Book not found!');
        return true;
    }
}
```
---

```bash
# book.resolver.ts
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { Book } from '../model/book.model';
import { CreateBookInput } from '../dto/create-book.input';
import { UpdateBookInput } from '../dto/update-book.input';

@Resolver(() => Book)
export class BookResolver {
    constructor(
        private readonly bookService: BookService
    ) {}

    @Query(() => [Book], { name: "getAllBooks" })
    async findAll() {
        return this.bookService.findAll();
    }

    @Query(() => Book, { name: "getBook" })
    async findOne(@Args('id', { type: () => String }) id: string) {
        return this.bookService.findOne(id);
    }

    @Mutation(() => Book)
    async create(@Args('input') input: CreateBookInput) {
        return this.bookService.create(input);
    }

    @Mutation(() => Book)
    async update(@Args('input') input: UpdateBookInput) {
        return this.bookService.update(input);
    }

    @Mutation(() => Boolean)
    async delete(@Args('id', { type: () => String }) id: string) {
        return this.bookService.delete(id);
    }
}
```
---
##### visite localhost:3000/graphql
```bash
# localhost:3000/graphql
# mutation {
#  create(input: {
#    title: "Backend Framework",
#     description: "Nestja is joss...working!!",
#     author: "Wasim"
#   }){
#    _id,
#   title,
#  author
#   }
# }

# query {
#   getAllBooks {
#     _id,
#     title,
#     author
#   }
# }

# query {
#   getBook(id:"69992a9ac9fd36d1be436714" ) {
#     _id,
#     title,
#     author
#   }
# }

# mutation {
#   delete (id: "6999307ac9fd36d1be43671e")
# }


mutation {
  update(input:{
    id:"69992a5ec9fd36d1be436712",
    title: "GraphQL is awesome!",
    description:"joss!",
    author:"Wasim Uddin"
  }){
    _id,
    title,
    author
  }
}
```
---

![](/public/img/graphql.png)


## Topic 34: Build Full CRUD App with GraphQL, Prisma & Neon DB


```bash
# GraphQL installation
$ npm i @nestjs/graphql @nestjs/apollo @apollo/server @as-integrations/express5 graphql
```
---

```bash
# Prisma Installation
$ npm install prisma --save-dev
$ npm install @prisma/client @prisma/adapter-pg pg
$ npx prisma init
```
---

##### Neon e project create koro and then database connect koro-
![](/public/img/neondatabase.png)
```bash
# .env
DATABASE_URL="postgresql://neondb_owner:npg_xFDa4wvps3Gq@ep-crimson-river-a1jhbuwa-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```
---

```bash
# schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}


model Book {
  id String @id @default(uuid())
  title String
  author String
  createdAt DateTime @default(now())
}
```
---

```bash
# Create and run your migration & Generate Prisma Client
$ npx prisma migrate dev --name init
$ npx prisma generate
```
---
![](/public/img/migrate.png)

```bash
# create- 
$ nest g module prisma
$ nest g service prisma
$ nest g module books
$ nest g service books
$ nest g resolver books
```
---

##### create koro- books/dto/create-book.input.ts, books/dto/update-book.input.ts & books/model/book.model.ts
![](/public/img/dto&model.png)

```bash
# prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
```
---
##### app.module.ts e add koro-
![](/public/img/app.module.png)

```bash
# create-book.input.ts
import { InputType, Field } from "@nestjs/graphql";
@InputType()
export class CreateBookInput {
    @Field()
    title: string;

    @Field()
    author: string;
}
```
---

```bash
# update-book.input.ts
import { InputType, Field, PartialType } from "@nestjs/graphql";
import { CreateBookInput } from "./create-book.input";
@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
    @Field()
    id: string;
}
```
---

##### prisma.module.ts file e add koro- exports: [PrismaService],

```bash
# prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```
---
##### books.module.ts e add koro- imports: [PrismaModule],
```bash
# books.module.ts
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BooksService, BooksResolver]
})
export class BooksModule {}
```
---

```bash
# book.model.ts
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Book {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    author: string;

    @Field()
    createdAt: Date;
}
```
---

```bash
# books.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) {}

    create(data: CreateBookInput) {
        return this.prisma.book.create({ data });
    }

    findAll() {
        return this.prisma.book.findMany();
    }

    findOne(id: string) {
        return this.prisma.book.findUnique({
            where: { id }
        })
    }

    update(data: UpdateBookInput) {
        return this.prisma.book.update({
            where: { id: data.id },
            data: {
                title: data.title,
                author: data.author
            }
        })
    }

    remove(id: string) {
        return this.prisma.book.delete({
            where: { id }
        })
    }
}
```
---

```bash
# books.resolver.ts
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './model/book.model';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) {}

    // Define your GraphQL queries and mutations here

    @Query(() => [Book])
    getAllBooks() {
        return this.booksService.findAll();
    }

    @Query(() => Book)
    getBookById(@Args('id')id: string) {
        return this.booksService.findOne(id);
    }

    @Mutation(() => Book)
    createBook(@Args('input') input: CreateBookInput) {
        return this.booksService.create(input);
    }

    @Mutation(() => Book)
    updateBook(@Args('input') input: UpdateBookInput) {
        return this.booksService.update(input);
    }

    @Mutation(() => Book)
    deleteBook(@Args('id') id: string) {
        return this.booksService.remove(id);
    }

}
```
---

```bash
# localhost:3000/graphql
# mutation{
# createBook(input:{
#     title: "PrismaORM for delete",
#     author: "Wasim Uddin"
#   }){
#     id
#     title
#   }
# }

# query {
#   getAllBooks {
#     id
#     title
#     author
#   }
# }


# mutation {
#   updateBook(input:{
#     id:"9ef7090b-28b3-40ff-89d7-0123d45ba639"
#     title: "PrismaORM Updated",
#     author: "Wasim Updated author"
#   }){
#     title
#   }
# }

# mutation {
#   deleteBook(id: "dd78234b-2241-4ce3-ab97-f670fce9096a"){
#     title
#   }
# }

query{
  getBookById(id:"a36953c8-f6b1-46b5-bac1-34c0fc0ecfa5"){
    title
    author
  }
}
```
---

![](/public/img/graphqlplayground.png)
![](/public/img/neon.png)