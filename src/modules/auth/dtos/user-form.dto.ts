import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserFormDto {
  @ApiProperty({ required: true, example: 'Simon-Bin' })
  @IsNotEmpty()
  @MaxLength(15, { message: '用户名太长了' })
  @MinLength(3, { message: '用户名太短了' })
  username: string;

  @ApiProperty({ required: true, example: '123456' })
  @IsNotEmpty()
  @MaxLength(15, { message: '密码太长了' })
  @MinLength(3, { message: '密码太短了' })
  password: string;

  @ApiProperty({ example: 'Simon' })
  firstName?: string;

  @ApiProperty({ example: 'Bin' })
  lastName?: string;
}
