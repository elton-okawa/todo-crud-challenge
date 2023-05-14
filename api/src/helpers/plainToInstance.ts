import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance as original,
} from 'class-transformer';

export function plainToInstance<T, V>(
  cls: ClassConstructor<T>,
  plain: V[],
  options?: ClassTransformOptions
): T[];
export function plainToInstance<T, V>(
  cls: ClassConstructor<T>,
  plain: V,
  options?: ClassTransformOptions
): T;

export function plainToInstance<T, V>(
  cls: ClassConstructor<T>,
  plain: unknown,
  options?: ClassTransformOptions
): unknown {
  return original(cls, plain, {
    exposeDefaultValues: true,
    ...options,
  });
}
