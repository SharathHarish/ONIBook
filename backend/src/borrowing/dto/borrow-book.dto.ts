import { IsInt, IsNotEmpty } from 'class-validator';

export class BorrowBookDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  bookId: number;
}
