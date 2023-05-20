import { validate } from 'helpers';
import { SignInParams } from './user.types';
import { userRepository } from 'data';
import { authService } from 'services/auth';

export function getMe(id: string) {
  return { id };
}

export async function signIn(params: SignInParams) {
  await validate(params);

  const existing = await userRepository.getUserByUsername(params.username);
  if (existing) {
    throw new Error(`User '${params.username}' already exists`);
  }

  const { hash, salt } = await authService.hashPassword(params.password);

  return userRepository.createUser({
    username: params.username,
    passwordHash: hash,
    salt: salt,
  });
}
