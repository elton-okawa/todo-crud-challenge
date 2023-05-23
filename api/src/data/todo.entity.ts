import { Entity } from './shared';

export class TodoEntity extends Entity {
  name!: string;

  description!: string;

  completed = false;

  userId!: string;
}
