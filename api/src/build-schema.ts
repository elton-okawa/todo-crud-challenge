import { schema } from './schemas';
import fs from 'fs';
import path from 'path';
import { printSchemaWithDirectives } from '@graphql-tools/utils';

fs.writeFileSync(
  path.resolve(path.join('src', '__generated__', 'schema.graphql')),
  printSchemaWithDirectives(schema)
);
