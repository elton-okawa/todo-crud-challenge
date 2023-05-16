import type { MutationResolvers, QueryResolvers } from '__generated__/graphql';
import { plainToInstance } from 'helpers';

import { todoService, EditTodoParams } from 'services/index';

export const Query: QueryResolvers = {
  todos: async () => {
    const list = await todoService.listTodo();

    return {
      edges: list.map((value) => ({ node: value })),
    };
  },
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
