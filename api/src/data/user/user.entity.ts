import { Exclude } from 'class-transformer';
import { Entity } from 'data';

export class UserEntity extends Entity {
  username!: string;

  @Exclude()
  passwordHash!: string;

  @Exclude()
  salt!: string;
}
