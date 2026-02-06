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
