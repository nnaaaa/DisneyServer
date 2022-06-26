import { IsHexColor, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

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
}
