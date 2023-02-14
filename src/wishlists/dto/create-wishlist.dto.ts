import {
  IsOptional,
  IsUrl,
  Length,
  IsNotEmpty,
  IsString,
  Max,
} from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsOptional()
  @IsString()
  @Max(1500)
  description: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  itemsId: Array<number>;
}
