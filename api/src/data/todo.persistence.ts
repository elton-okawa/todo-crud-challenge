import { TodoEntity } from './todo.entity';
import { collections } from './database';
import { plainToInstance } from 'helpers';
import { ObjectId } from 'mongodb';

export async function createTodo(todo: Partial<TodoEntity>) {
  const entity = plainToInstance(TodoEntity, todo);
  const result = await collections.todo.insertOne(entity);

  return plainToInstance(TodoEntity, { _id: result.insertedId, ...todo });
}

export async function listTodo() {
  const results = await collections.todo.find().toArray();
  return plainToInstance(TodoEntity, results);
}

export async function getTodo(id: string) {
  const result = await collections.todo.findOne({ _id: new ObjectId(id) });

  return result ? plainToInstance(TodoEntity, result) : null;
}

export async function editTodo(id: string, params: Partial<TodoEntity>) {
  const result = await collections.todo.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: params },
    { returnDocument: 'after' }
  );

  return result.value ? plainToInstance(TodoEntity, result.value) : null;
}

export async function deleteTodo(id: string) {
  const result = await collections.todo.deleteOne({ _id: new ObjectId(id) });
  console.log(result);
  return result.deletedCount === 1;
}
