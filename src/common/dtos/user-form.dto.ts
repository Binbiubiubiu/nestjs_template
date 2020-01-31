import { IsNotEmpty, Length } from 'class-validator';

export class UserFormDto {
  @IsNotEmpty()
  @Length(3, 15)
  username: string;

  @IsNotEmpty()
  @Length(8, 25)
  password: string;

  firstName?: string;

  lastName?: string;
}
