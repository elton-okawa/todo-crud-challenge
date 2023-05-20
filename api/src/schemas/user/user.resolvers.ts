import type {
  MutationResolvers,
  QueryResolvers,
  UserResolvers,
} from '__generated__/graphql';
import { plainToInstance } from 'helpers';
import { SignInParams, todoService, userService } from 'services/index';

export const Query: QueryResolvers = {
  me: () => ({ id: 'no-id' }),
};

export const Mutation: MutationResolvers = {
  signIn: (_, args) => {
    const params = plainToInstance(SignInParams, args.input);
    return userService.signIn(params);
  },
};

export const User: UserResolvers = {
  todos: async ({ id }) => {
    const todos = await todoService.listTodo();

    return {
      edges: todos.map((value) => ({ node: value })),
    };
  },
};
