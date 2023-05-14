import type { MutationResolvers } from '__generated__/graphql';

import { todoService } from 'services/index';

export const Mutation: MutationResolvers = {
  addTodo: (_, todo) => todoService.createTodo(todo.name, todo.description),
};
