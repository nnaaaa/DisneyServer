import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateChannelDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsBoolean()
    isPrivate?: boolean
}
