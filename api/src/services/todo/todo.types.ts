import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EditTodoParams {
  @IsMongoId()
  id!: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(300)
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
