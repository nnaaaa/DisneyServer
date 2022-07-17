import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EmojiDto, MemberDto } from 'src/shared/dtos'
import { ActionDto } from 'src/shared/dtos/action.dto'

export class CreateReactDto {
    @ValidateNested()
    @Type(() => EmojiDto)
    emoji: EmojiDto

    @ValidateNested()
    @Type(() => ActionDto)
    action: ActionDto

    @ValidateNested()
    @Type(() => MemberDto)
    author: MemberDto
}
