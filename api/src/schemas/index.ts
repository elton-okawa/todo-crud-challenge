import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typesArray = loadFilesSync(
  path.join(__dirname, '**', '*.types.graphql'),
  { recursive: true }
);
const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(
  path.join(__dirname, '**', '*.resolvers.*')
);
const resolvers = mergeResolvers(resolversArray);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
