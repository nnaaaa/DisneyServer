import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateGuildDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsUrl()
  @IsOptional()
  avatarUrl: string
}
