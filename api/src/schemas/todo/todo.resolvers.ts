import type { MutationResolvers, QueryResolvers } from '__generated__/graphql';
import { plainToInstance } from 'helpers';

import { todoService, EditTodoParams, CreateTodoParams } from 'services/index';

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
    const params = plainToInstance(CreateTodoParams, args);
    const todo = await todoService.createTodo(params);
    return { todoEdge: { node: todo } };
  },
  editTodo: (_, args) => {
    const params = plainToInstance(EditTodoParams, args);
    return todoService.editTodo(params);
  },
  deleteTodo: async (_, args) => {
    await todoService.deleteTodo(args.id);
    return args.id;
  },
};
