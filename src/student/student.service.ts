import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: MongoRepository<Student>,
  ) {}

  async createStudent({ firstName, lastName }: CreateStudentInput) {
    const student = this.studentRepository.create({
      firstName,
      lastName,
      id: uuid(),
    });
    return await this.studentRepository.save(student);
  }

  async getAllStudents() {
    return await this.studentRepository.find();
  }

  async getStudent(id: string) {
    return await this.studentRepository.findOneBy({ id });
  }

  async getManyStudents(studentIds: string[]) {
    const students = this.studentRepository.find({
      where: { id: { $in: studentIds } },
    });
    return students;
  }
}
