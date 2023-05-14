import type { MutationResolvers } from '__generated__/graphql';

import { todoService } from 'services/index';
import { TodoEntity } from 'data/index';

export const Mutation: MutationResolvers = {
  addTodo: (_, todo) => todoService.addTodo(new TodoEntity(todo)),
};
