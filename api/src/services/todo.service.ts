import { todoRepository } from 'data';

const ID_REGEX = /[0-9a-fA-F]{24}/;

export async function createTodo(name: string, description: string) {
  const entity = await todoRepository.createTodo({ name, description });
  return entity;
}

export async function listTodo() {
  const results = await todoRepository.listTodo();
  return results;
}

export async function getTodo(id: string) {
  if (!ID_REGEX.test(id)) {
    throw new Error(`id must follow regex ${ID_REGEX}`);
  }

  const entity = await todoRepository.getTodo(id);

  if (!entity) {
    throw new Error(`Todo entity with id '${id}' not found`);
  }

  return entity;
}
