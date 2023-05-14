import { validate } from 'class-validator';

import { plainToInstance } from './plainToInstance';
import { ClassConstructor } from 'class-transformer';

export async function plainToInstanceValidate<T extends object, V>(
  cls: ClassConstructor<T>,
  plain: V
): Promise<T> {
  const instance = plainToInstance(cls, plain);
  const errors = await validate(instance, {
    validationError: { target: false },
  });
  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }

  return instance;
}
