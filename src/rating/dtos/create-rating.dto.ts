import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNumber()
  @Max(5)
  @Min(1)
  @IsNotEmpty()
  stars: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

}
