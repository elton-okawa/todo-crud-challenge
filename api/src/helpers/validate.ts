import { validate as original } from 'class-validator';

export async function validate<T extends object>(instance: T) {
  const errors = await original(instance, {
    validationError: { target: false },
  });
  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }
}
