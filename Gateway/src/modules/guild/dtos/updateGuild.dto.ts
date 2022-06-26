import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator'

export class UpdateGuildDto {
    @IsNotEmpty()
    @IsUUID()
    guildId: string

    @IsOptional()
    @IsString()
    nickname?: string

    @IsUrl()
    @IsOptional()
    avatarUrl?: string
}
