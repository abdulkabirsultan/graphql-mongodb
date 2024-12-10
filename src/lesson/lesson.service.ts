import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignLessonToStudentsInput } from './assign-lesson-to-students.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}
  async createLesson({
    name,
    startDate,
    endDate,
    students,
  }: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      name,
      endDate,
      startDate,
      id: uuid(),
      students,
    });

    return await this.lessonRepository.save(lesson);
  }

  async getLesson(id: string) {
    console.log(id);

    return await this.lessonRepository.findOneBy({ id });
  }

  async getAllLessons() {
    return await this.lessonRepository.find();
  }

  async assignLessonToStudent({
    lessonId,
    studentsId,
  }: AssignLessonToStudentsInput) {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    lesson.students = [...lesson.students, ...studentsId];
    return await this.lessonRepository.save(lesson);
  }
}
