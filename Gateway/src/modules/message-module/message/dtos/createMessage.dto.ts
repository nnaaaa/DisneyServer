import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateActionDto } from '../../action/dtos/createAction.dto'

export class CreateMessageDto {
    @IsString()
    @IsOptional()
    content?: string

    @IsArray()
    @IsOptional()
    images?: string[]

    @ValidateNested()
    @IsOptional()
    action?: CreateActionDto
}
