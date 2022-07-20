import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ButtonStyle } from 'src/entities/button.entity'

export class CreateButtonDto {
    @IsString()
    @IsOptional()
    customId?: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEnum(ButtonStyle)
    @IsOptional()
    style?: ButtonStyle

    @IsBoolean()
    @IsOptional()
    isDisabled: boolean
}
