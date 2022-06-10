import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator'

export class VerifyAuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Account',
    example: 'test@test.com',
    required: true,
  })
  public readonly account: string

  @IsNotEmpty()
  @IsNumberString()
  public readonly digitCode: number
}
