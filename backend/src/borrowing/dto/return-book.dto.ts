import { IsInt, IsNotEmpty } from 'class-validator';

export class ReturnBookDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  bookId: number;
}
