import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

function getTypeDefs() {
  const typesArray = loadFilesSync(
    path.join(__dirname, '**', '*.types.graphql'),
    { recursive: true }
  );
  return mergeTypeDefs(typesArray);
}

function getResolvers() {
  const resolversArray = loadFilesSync(
    path.join(__dirname, '**', '*.resolvers.*')
  );
  return mergeResolvers(resolversArray);
}

export function buildGraphQLSchema() {
  const typeDefs = getTypeDefs();
  return makeExecutableSchema({ typeDefs });
}

export function buildExecutableSchema() {
  const typeDefs = getTypeDefs();
  const resolvers = getResolvers();
  return makeExecutableSchema({ typeDefs, resolvers });
}
