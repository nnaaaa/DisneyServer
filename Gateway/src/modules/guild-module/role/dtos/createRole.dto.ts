import { IsArray, IsHexColor, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'
import { Permission } from 'src/entities/role.entity'

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsUrl()
    @IsOptional()
    icon?: string

    @IsHexColor()
    @IsOptional()
    color?: string

    @IsArray()
    @IsOptional()
    permissions: Permission[]
}
