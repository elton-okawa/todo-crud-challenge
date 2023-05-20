import {
  IsAlphanumeric,
  IsDefined,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInParams {
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsAlphanumeric()
  username!: string;

  @IsString()
  @MinLength(5)
  password!: string;
}

export class LoginParams {
  @IsDefined()
  username!: string;

  @IsDefined()
  password!: string;
}
