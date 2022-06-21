import {
    IsHexColor,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
} from 'class-validator'

export class UpdateRoleDto {
    @IsNotEmpty()
    @IsUUID()
    roleId: string

    @IsString()
    @IsOptional()
    name: string

    @IsUrl()
    @IsOptional()
    icon?: string

    @IsHexColor()
    @IsOptional()
    color?: string
}
