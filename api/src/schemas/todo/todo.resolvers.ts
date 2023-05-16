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
  addTodo: async (_, args) => {
    const todo = await todoService.createTodo(args.name, args.description);
    return { todoEdge: { node: todo } };
  },
  editTodo: (_, args) => {
    const params = plainToInstance(EditTodoParams, args);
    return todoService.editTodo(params);
  },
  deleteTodo: (_, args) => todoService.deleteTodo(args.id),
};
