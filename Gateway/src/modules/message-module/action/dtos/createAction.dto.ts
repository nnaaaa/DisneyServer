import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { MessageDto } from 'src/shared/dtos'
import { CreateButtonDto } from '../../button/dto/createButton.dto'
import { CreateReactDto } from '../../react/dtos/createReact.dto'

export class CreateActionDto {
    @ValidateNested()
    @Type(() => MessageDto)
    message: MessageDto

    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CreateButtonDto)
    buttons: CreateButtonDto[]

    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CreateReactDto)
    reacts: CreateReactDto[]
}
