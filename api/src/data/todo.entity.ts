import { Expose } from 'class-transformer';

export class TodoEntity {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  completed = false;
}
