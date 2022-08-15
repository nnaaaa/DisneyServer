import { IsBoolean, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator'
import { UserStatus } from 'src/entities/user.entity'

export class UpdateProfileDto {
    @IsOptional()
    @IsUrl()
    avatarUrl?: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus
}
