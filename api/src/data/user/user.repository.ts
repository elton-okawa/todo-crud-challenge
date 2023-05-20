import { UserEntity } from './user.entity';
import { collections } from 'data/shared';
import { plainToInstance } from 'helpers';

export async function createUser(user: Partial<UserEntity>) {
  const entity = plainToInstance(UserEntity, user);
  const res = await collections.user.insertOne(entity);
  return plainToInstance(UserEntity, { ...user, _id: res.insertedId });
}

export async function getUserByUsername(username: string) {
  const user = await collections.user.findOne({ username });
  return user ? plainToInstance(UserEntity, user) : null;
}
