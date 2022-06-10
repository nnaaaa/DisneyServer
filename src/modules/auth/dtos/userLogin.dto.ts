import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Account',
    example: 'test@test.com',
    required: true,
  })
  public readonly account: string

  @IsNotEmpty()
  @ApiProperty({
    description: 'Password',
    example: 'password',
    required: true,
  })
  public readonly password: string
}
