import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator'

export class BotDto {
    @IsUUID()
    @IsNotEmpty()
    botId: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsUrl()
    avatarUrl: string
}
