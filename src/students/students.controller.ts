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
