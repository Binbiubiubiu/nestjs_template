import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
