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
    data?: Student;
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

  async getAllStudents(): Promise<{
    success: boolean;
    data?: Student[];
    message: string;
    error?: string | null;
  }> {
    try {
      const students = await this.studentModel.find().exec();
      return {
        success: true,
        data: students,
        message: 'Students retrieved successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: 'Error retrieving students',
          error: error.message || 'Unknown error',
        };
      }
      return {
        success: false,
        message: 'Error retrieving students',
        error: (error as Error).message || 'Unknown error',
      };
    }
  }

  async getStudentById(id: string): Promise<{
    success: boolean;
    data?: Student | null;
    message: string;
    error?: string | null;
  }> {
    try {
      const student = await this.studentModel.findById(id).exec();
      if (!student) {
        return {
          success: false,
          message: 'Student not found',
          error: null,
        };
      }
      return {
        success: true,
        data: student,
        message: 'Student retrieved successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: 'Error retrieving student',
          error: error.message || 'Unknown error',
        };
      }
      return {
        success: false,
        message: 'Error retrieving student',
        error: (error as Error).message || 'Unknown error',
      };
    }
  }

  async updateStudent(
    data: Partial<Student>,
    id: string,
  ): Promise<{
    success: boolean;
    message: string;
    data?: Student | null;
    error?: null | string;
  }> {
    try {
      const student = await this.studentModel.findByIdAndUpdate(id, data, {new: true}).exec();
      console.log('student', student);
      if (!student) {
        return {
          success: true,
          data: student,
          message: 'Student retrieved successfully',
        };
      }
      return {
        success: true,
        data: student,
        message: 'Student updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: 'Error updating student',
          error: error.message || 'Unknown error',
        };
      }
      return {
        success: false,
        message: 'Error updating student',
        error: (error as Error).message || 'Unknown error',
      };
    }
  }

  async updatePartialData(id: string, data: Partial<Student>){
    try {
      console.log('id', id);
      console.log('data', data);
      const updatedUser = await this.studentModel.findByIdAndUpdate(id, data, {new : true}).exec()
      console.log('updatedUser', updatedUser);
      if(!updatedUser){
        return {
          suceess: false,
          data: null,
          message: 'Student not found',
        };
      }
      return {
        success: true,
        data: updatedUser,
        message: 'Student updated successfully patch',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: 'Error updating student',
          error: error.message || 'Unknown error',
        };
      }
    }
  }


  async deleteStudent(id: string){
    try {
      const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
      if (!deletedStudent) {
        return {
          success: false,
          message: 'Student not found',
          error: null,
        };
      }
      return {
        success: true,
        message: 'Student deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: 'Error deleting student',
          error: error.message || 'Unknown error',
        };
      }
    }
  }


}
