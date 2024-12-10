import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('Lesson')
export class Lesson {
  @ObjectIdColumn()
  _id: ObjectId;
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  students: string[];
}
