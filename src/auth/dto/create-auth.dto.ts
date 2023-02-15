import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
