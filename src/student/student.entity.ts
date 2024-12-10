import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('Student')
export class Student {
  @PrimaryColumn()
  id: string;

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
