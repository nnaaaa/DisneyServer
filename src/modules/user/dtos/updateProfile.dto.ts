import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsEmpty, IsNotEmpty } from 'class-validator'
import { UserEntity } from 'src/entities/user.entity'

export class UpdateProfileDto extends OmitType(UserEntity, [
  'userId',
  'account',
  'password',
  'changePwdVerfiyCode',
  'registerVerifyCode',
  'lastLogin',
  'refreshToken',
]) {
  avatarUrl: string

  name: string

  isOnline: boolean

  @IsEmpty()
  password: string
  @IsEmpty()
  account: string
  @IsEmpty()
  userId: string
  @IsEmpty()
  changePwdVerfiyCode: number
  @IsEmpty()
  registerVerifyCode: number
  @IsEmpty()
  accorefreshTokenunt: string
}
