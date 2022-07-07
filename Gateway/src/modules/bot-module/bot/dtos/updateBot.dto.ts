import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator'
import { Permission } from 'src/entities/role.entity'

export class UpdateBotDto {
    @IsUUID()
    @IsNotEmpty()
    botId: string

    @IsOptional()
    @IsUrl()
    avatarUrl?: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsArray()
    @IsOptional()
    requiredPermissions: Permission[]
}
