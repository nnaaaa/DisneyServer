import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator'

export class UpdateGuildDto {
    @IsNotEmpty()
    @IsUUID()
    guildId: string

    @IsOptional()
    @IsString()
    name?: string

    @IsUrl()
    @IsOptional()
    avatarUrl?: string
}
