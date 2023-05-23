import { buildGraphQLSchema } from './schemas';
import fs from 'fs';
import path from 'path';
import { printSchemaWithDirectives } from '@graphql-tools/utils';

const folder = path.resolve(path.join('src', '__generated__'));
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

fs.writeFileSync(
  path.join(folder, 'schema.graphql'),
  printSchemaWithDirectives(buildGraphQLSchema())
);
