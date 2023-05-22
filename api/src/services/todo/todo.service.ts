import { UserEntity, todoRepository } from 'data';

import { validate } from 'helpers';
import { CreateTodoParams, EditTodoParams } from './todo.types';
import { validateAuthenticatedUser } from 'services/auth/auth.service';

const ID_REGEX = /[0-9a-fA-F]{24}/;

export async function createTodo(
  user: UserEntity | null,
  params: CreateTodoParams
) {
  await validate(params);
  const authenticated = validateAuthenticatedUser(user);

  const entity = await todoRepository.createTodo({
    ...params,
    userId: authenticated.id,
  });
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

export async function editTodo(
  user: UserEntity | null,
  params: EditTodoParams
) {
  await validate(params);
  const authenticated = validateAuthenticatedUser(user);
  const { id, ...others } = params;

  const result = await todoRepository.editTodo(id, authenticated.id, others);
  if (!result) {
    throw new Error(
      `Todo entity with id '${id}' not found for user '${authenticated.id}'`
    );
  }

  return result;
}

export function deleteTodo(user: UserEntity | null, id: string) {
  const authenticated = validateAuthenticatedUser(user);
  return todoRepository.deleteTodo(id, authenticated.id);
}
