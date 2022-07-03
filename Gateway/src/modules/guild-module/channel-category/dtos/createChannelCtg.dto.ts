import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateChannelCtgDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsBoolean()
    @IsOptional()
    isPrivate?: boolean
}
