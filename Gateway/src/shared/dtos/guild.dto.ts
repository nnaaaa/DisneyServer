import { IsNotEmpty, IsUUID } from 'class-validator'

export class GuildDto {
    @IsUUID()
    @IsNotEmpty()
    guildId: string
}
