import { Injectable } from '@nestjs/common';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(data: Partial<Student>): Promise<{
    success: boolean;
    data?: StudentDocument;
    message: string;
    error?: string | null;
  }> {
    try {
      const newStudent = new this.studentModel(data);
      const student = await newStudent.save();
      return {
        success: true,
        data: student,
        message: 'Student created successfully',
      }; // Assuming you want to return a success message with the saved student
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          message: 'Error creating student',
          error: error.message || 'Unknown error',
        };
      }
      return {
        success: false,
        message: 'Error creating student',
        error: (error as Error).message || 'Unknown error',
      };
    }
  }
}
