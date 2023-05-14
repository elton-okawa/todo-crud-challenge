import type { QueryResolvers } from '__generated__/graphql';

export const Query: QueryResolvers = {
  hello: (_, { name }) => {
    return `Hello ${name ? name : 'World'}!`;
  },
};
