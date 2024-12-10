import { StudentService } from './../student/student.service';
import { AssignLessonToStudentsInput } from './assign-lesson-to-students.input';
import { LessonService } from './lesson.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.entity';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [LessonType])
  getAllLessons() {
    return this.lessonService.getAllLessons();
  }

  @Mutation(() => LessonType)
  async createLesson(
    @Args('CreateLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assignLessonToStudents(
    @Args('assignLessonToStudentsInput')
    assignLessonToStudentsInput: AssignLessonToStudentsInput,
  ) {
    return this.lessonService.assignLessonToStudent(
      assignLessonToStudentsInput,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    const students = lesson.students;
    return this.studentService.getManyStudents(students);
  }
}
