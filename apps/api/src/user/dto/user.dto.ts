import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty({
    description: 'Email',
    type: String,
  })
  @IsEmail()
  email: string;
}
