import {
  MutationResolvers,
  QueryResolvers,
  UserResolvers,
  ViewerResolvers,
} from '__generated__/graphql';
import { plainToInstance } from 'helpers';
import { LoginParams, SignupParams, todoService, userService } from 'services';
import { GraphQLContext } from 'types';

export const Query: QueryResolvers<GraphQLContext> = {
  viewer: () => ({ me: null }),
};

export const Mutation: MutationResolvers = {
  signup: (_, args) => {
    const params = plainToInstance(SignupParams, args.input);
    return userService.signup(params);
  },
  login: (_, args) => {
    const params = plainToInstance(LoginParams, args.input);
    return userService.login(params);
  },
};

export const User: UserResolvers<GraphQLContext> = {
  todos: async (_parent, _args, context) => {
    const todos = await todoService.listTodo({ user: context.user });

    return {
      edges: todos.map((value) => ({ node: value })),
    };
  },
};

export const Viewer: ViewerResolvers = {
  me: (_parent, _args, context) => userService.getMe(context.user),
};
