import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/__generated__/schema.graphql',
  generates: {
    'src/__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
  require: ['ts-node/register', 'tsconfig-paths/register'],
};

export default config;
