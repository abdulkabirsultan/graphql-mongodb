import { StudentService } from './student.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { CreateStudentInput } from './student.input';

@Resolver(() => StudentType)
export class StudentReslover {
  constructor(private studentService: StudentService) {}

  @Mutation(() => StudentType)
  createStudent(@Args('createStudent') createStudentInput: CreateStudentInput) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query(() => [StudentType])
  students() {
    return this.studentService.getAllStudents();
  }

  @Query(() => StudentType)
  getStudent(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }
}
