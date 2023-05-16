import type { MutationResolvers, QueryResolvers } from '__generated__/graphql';
import { plainToInstance } from 'helpers';

import { todoService, EditTodoParams } from 'services/index';

export const Query: QueryResolvers = {
  listTodo: () => todoService.listTodo(),
  getTodo: (_, args) => todoService.getTodo(args.id),
};

export const Mutation: MutationResolvers = {
  addTodo: (_, todo) => todoService.createTodo(todo.name, todo.description),
  editTodo: (_, args) => {
    const params = plainToInstance(EditTodoParams, args);
    return todoService.editTodo(params);
  },
  deleteTodo: (_, args) => todoService.deleteTodo(args.id),
};
