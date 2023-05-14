import { todoRepository } from 'data';

export async function createTodo(name: string, description: string) {
  const entity = await todoRepository.createTodo({ name, description });
  return entity;
}

export async function listTodo() {
  const results = await todoRepository.listTodo();
  return results;
}
