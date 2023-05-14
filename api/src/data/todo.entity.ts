import { Transform } from 'class-transformer';

export class TodoEntity {
  @Transform((params) => params.obj._id.toString())
  id!: string;

  name!: string;

  description!: string;

  completed = false;
}
