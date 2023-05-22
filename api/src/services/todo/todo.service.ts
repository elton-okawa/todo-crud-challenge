import { UserEntity, todoRepository } from 'data';

import { validate } from 'helpers';
import { CreateTodoParams, EditTodoParams } from './todo.types';
import { UnauthorizedError } from 'services/errors';
import { UnauthorizedCode } from '__generated__/graphql';

const ID_REGEX = /[0-9a-fA-F]{24}/;

export async function createTodo(
  user: UserEntity | null,
  params: CreateTodoParams
) {
  await validate(params);

  if (!user) {
    throw new UnauthorizedError(
      'You must be logged in',
      UnauthorizedCode.TokenExpired
    );
  }

  const entity = await todoRepository.createTodo({
    ...params,
    userId: user.id,
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

export async function editTodo(params: EditTodoParams) {
  await validate(params);
  const { id, ...others } = params;

  const result = await todoRepository.editTodo(id, others);
  if (!result) {
    throw new Error(`Todo entity with id '${id}' not found`);
  }

  return result;
}

export function deleteTodo(id: string) {
  return todoRepository.deleteTodo(id);
}
