import { todoRepository } from 'data';

export function createTodo(name: string, description: string) {
  return todoRepository.createTodo({ name, description });
}
