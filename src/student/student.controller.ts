import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';

@Controller('api/v1/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post()
  async addStudent(@Body() data: Partial<Student>) {
    return this.studentService.createStudent(data);
  }

  @Get()
  async getStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @Put(':id')
  async updateStudent(@Body() data: Partial<Student>, @Param('id') id: string) {
    return this.studentService.updateStudent(data, id);
  }

  @Patch(':id')
  async partialUpdateStudent(
    @Body() data: Partial<Student>,
    @Param('id') id: string,
  ) {
    return this.studentService.updatePartialData(id, data);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
