import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsOptional()
  @IsBoolean()
  isBorrowed?: boolean;
}
