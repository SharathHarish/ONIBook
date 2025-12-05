import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  authorId: number; // relation to Author

  @IsOptional()
  isBorrowed?: boolean; // default false
}
