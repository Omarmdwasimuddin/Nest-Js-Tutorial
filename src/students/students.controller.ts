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
