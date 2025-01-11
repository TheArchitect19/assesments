import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupDTO {
  @ApiProperty({
    description: 'Email of the user',
    format: 'email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    format: 'password',
    example: 'StrongPassword123',
  })
  @IsString()
  password: string;

}

export class LoginDTO {
  @ApiProperty({
    description: 'Email of the user',
    format: 'email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    format: 'password',
    example: 'StrongPassword123',
  })
  @IsString()
  password: string;
}
