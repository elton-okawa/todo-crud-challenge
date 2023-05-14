import type { MutationResolvers, QueryResolvers } from '__generated__/graphql';

import { todoService } from 'services/index';

export const Query: QueryResolvers = {
  listTodo: () => todoService.listTodo(),
};

export const Mutation: MutationResolvers = {
  addTodo: (_, todo) => todoService.createTodo(todo.name, todo.description),
};
