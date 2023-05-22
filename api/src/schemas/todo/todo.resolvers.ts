import type { MutationResolvers, QueryResolvers } from '__generated__/graphql';
import { plainToInstance } from 'helpers';

import { todoService, EditTodoParams, CreateTodoParams } from 'services/index';
import { GraphQLContext } from 'types';

export const Query: QueryResolvers = {
  todos: async () => {
    const list = await todoService.listTodo();

    return {
      edges: list.map((value) => ({ node: value })),
    };
  },
  getTodo: (_, args) => todoService.getTodo(args.id),
};

export const Mutation: MutationResolvers<GraphQLContext> = {
  addTodo: async (_, args, context) => {
    const params = plainToInstance(CreateTodoParams, args);
    const todo = await todoService.createTodo(context.user, params);
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
