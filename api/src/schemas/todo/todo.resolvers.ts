import type { MutationResolvers, QueryResolvers } from '__generated__/graphql';

import { todoService } from 'services/index';

export const Query: QueryResolvers = {
  listTodo: () => todoService.listTodo(),
  getTodo: (_, args) => todoService.getTodo(args.id),
};

export const Mutation: MutationResolvers = {
  addTodo: (_, todo) => todoService.createTodo(todo.name, todo.description),
  editTodo: (_, params) => todoService.editTodo(params),
};
