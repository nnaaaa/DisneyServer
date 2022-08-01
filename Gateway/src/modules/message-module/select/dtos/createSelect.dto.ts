import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'
import { SelectStyle } from 'src/entities/select.entity'
import { CreateOptionDto } from './createOption.dto'

export class CreateSelectDto {
    @IsString()
    @IsOptional()
    customId?: string

    @IsEnum(SelectStyle)
    @IsOptional()
    style?: SelectStyle

    @IsBoolean()
    @IsOptional()
    isDisabled?: boolean

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOptionDto)
    options: CreateOptionDto[]
}
