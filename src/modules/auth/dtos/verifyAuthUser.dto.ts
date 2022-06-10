import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator'

export class VerifyAuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Account',
    example: 'example@gamil.com',
    required: true,
  })
  public readonly account: string

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    description: 'Digit Code',
    example: '123456',
    required: true,
  })
  public readonly digitCode: number
}
