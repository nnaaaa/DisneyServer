import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateChannelDto {
    @IsUUID()
    @IsNotEmpty()
    channelId: string

    @IsOptional()
    @IsBoolean()
    isPrivate?: boolean

    @IsOptional()
    @IsString()
    name?: string
}
