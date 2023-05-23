import { UserEntity } from 'data';
import { UnauthorizedError } from 'services';

export interface GraphQLContext {
  user: UserEntity | null;
  error: UnauthorizedError | null;
}
