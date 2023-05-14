import { TodoEntity } from './todo.entity';
import { collections } from './database';
import { plainToInstance } from 'helpers';

export async function createTodo(todo: Partial<TodoEntity>) {
  const entity = plainToInstance(TodoEntity, todo);
  const result = await collections.todo.insertOne(entity);

  entity.id = result.insertedId.toString();
  return entity;
}
