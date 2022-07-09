import { IsArray, IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator'
import { Permission } from 'src/entities/role.entity'

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

    @IsNotEmpty()
    @IsArray()
    requiredPermissions: Permission[]
}
