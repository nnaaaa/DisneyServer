import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator'

export class ForgetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Account',
    example: 'example@gamil.com',
    required: true,
  })
  public readonly account: string
}

export class NewPasswordDto extends ForgetPasswordDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'New Password',
    example: 'newPassword',
    required: true,
  })
  public readonly newPassword: string
}

export class NewPassordWithSMSDto extends NewPasswordDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    description: 'Digit Code',
    example: '123456',
    required: true,
  })
  public readonly digitCode: number
}

export class NewPasswordWithComparation extends NewPasswordDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Old Password',
    example: 'oldPassword',
    required: true,
  })
  public readonly oldPassword: string
}
