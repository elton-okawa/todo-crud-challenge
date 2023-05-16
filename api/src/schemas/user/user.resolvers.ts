import type { QueryResolvers, UserResolvers } from '__generated__/graphql';
import { todoService } from 'services/index';

export const Query: QueryResolvers = {
  me: () => ({ id: 'no-id' }),
};

export const User: UserResolvers = {
  todos: async ({ id }) => {
    const todos = await todoService.listTodo();

    return {
      edges: todos.map((value) => ({ node: value })),
    };
  },
};
