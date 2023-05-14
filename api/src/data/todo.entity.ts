import { Expose, Transform } from 'class-transformer';

export class TodoEntity {
  @Expose()
  @Transform((params) => params.obj._id.toString())
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  completed = false;
}
