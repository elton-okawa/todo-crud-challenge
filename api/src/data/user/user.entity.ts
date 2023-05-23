import { Exclude } from 'class-transformer';
import { Entity } from 'data';

export class UserEntity extends Entity {
  username!: string;

  @Exclude({ toPlainOnly: true })
  passwordHash!: string;

  @Exclude({ toPlainOnly: true })
  salt!: string;
}
