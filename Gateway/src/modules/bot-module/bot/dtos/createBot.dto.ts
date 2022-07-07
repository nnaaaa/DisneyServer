import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'
import { Permission } from 'src/entities/role.entity'

export class CreateBotDto {
    @IsOptional()
    @IsUrl()
    avatarUrl?: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsArray()
    @IsOptional()
    requiredPermissions: Permission[]
}
