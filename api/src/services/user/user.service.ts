import { validate } from 'helpers';
import { LoginParams, SignInParams } from './user.types';
import { UserEntity, userRepository } from 'data';
import { authService } from 'services/auth';
import { UnauthorizedError } from 'services/errors';
import { UnauthorizedCode } from '__generated__/graphql';

export function getMe(user: UserEntity | null) {
  if (!user) {
    throw new UnauthorizedError('Unauthorized', UnauthorizedCode.MissingToken);
  }

  return user;
}

export async function getAuthenticatedUser(token: string) {
  const data = authService.validateToken(token);
  const user = await userRepository.getUserById(data.id);

  if (!user) {
    throw new Error(`User from token with id '${data.id}' not found`);
  }

  return user;
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

export async function login(params: LoginParams) {
  await validate(params);

  const user = await userRepository.getUserByUsername(params.username);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const match = await authService.comparePassword(
    user.passwordHash,
    user.salt,
    params.password
  );
  if (!match) {
    throw new Error('Invalid username or password');
  }

  return authService.generateToken(user.id, user.username);
}
