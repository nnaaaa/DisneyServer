import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator'

export class UpdateProfileDto {
    @IsOptional()
    @IsUrl()
    avatarUrl?: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsBoolean()
    isOnline?: boolean
}
