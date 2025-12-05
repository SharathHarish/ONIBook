import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  bio: string; // short biography
}
