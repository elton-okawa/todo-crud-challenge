import {
  MutationResolvers,
  QueryResolvers,
  UnauthorizedCode,
  UserResolvers,
  UserResultResolvers,
} from '__generated__/graphql';
import { plainToInstance } from 'helpers';
import {
  LoginParams,
  SignInParams,
  UnauthorizedError,
  todoService,
  userService,
} from 'services';
import { GraphQLContext } from 'types';

export const Query: QueryResolvers<GraphQLContext> = {
  me: (_parent, _args, context) => {
    if (context.error) {
      return { message: context.error.message, code: context.error.code };
    }

    try {
      return userService.getMe(context.user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { message: error.message, code: error.code };
      } else {
        throw error;
      }
    }
  },
};

export const Mutation: MutationResolvers = {
  signIn: (_, args) => {
    const params = plainToInstance(SignInParams, args.input);
    return userService.signIn(params);
  },
  login: (_, args) => {
    const params = plainToInstance(LoginParams, args.input);
    return userService.login(params);
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

export const UserResult: UserResultResolvers = {
  __resolveType: (obj) => {
    const asError = obj as UnauthorizedError;
    if (asError.code && asError.message) return 'UnauthorizedError';
    else return 'User';
  },
};
