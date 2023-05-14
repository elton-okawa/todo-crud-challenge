import { schema } from './graphql';
import fs from 'fs';
import path from 'path';
import { printSchemaWithDirectives } from '@graphql-tools/utils';

fs.writeFileSync(
  path.join(__dirname, '__generated__', 'schema.graphql'),
  printSchemaWithDirectives(schema)
);
