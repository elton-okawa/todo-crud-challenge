import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(path.join('.test.env')) });

export default () => {
  console.log('\n#### Setup done! ####');
};
