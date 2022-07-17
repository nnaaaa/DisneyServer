import { EmojiDto, MemberDto } from 'src/shared/dtos'
import { ActionDto } from 'src/shared/dtos/action.dto'
export declare class CreateReactDto {
    emoji: EmojiDto
    action: ActionDto
    author: MemberDto
}
