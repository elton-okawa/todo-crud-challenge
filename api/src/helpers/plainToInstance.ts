import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance as original,
} from 'class-transformer';

export function plainToInstance<T, V>(
  cls: ClassConstructor<T>,
  plain: V,
  options?: ClassTransformOptions
): T {
  return original(cls, plain, {
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
    ...options,
  });
}
