import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class UpdatejoinGuild {
  @IsString()
  @IsNotEmpty()
  guildId: string

  @IsOptional()
  @IsString()
  nickname: string

  @IsOptional()
  @IsString()
  avatarUrl: string
}
