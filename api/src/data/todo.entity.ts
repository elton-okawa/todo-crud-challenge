import { randomUUID } from 'crypto';

export class TodoEntity {
  id: string;
  name: string;
  description: string;
  completed: boolean;

  // TODO typing
  constructor(params: any) {
    this.id = params.id ?? randomUUID();
    this.name = params.name;
    this.description = params.description;
    this.completed = params.completed ?? false;
  }
}
