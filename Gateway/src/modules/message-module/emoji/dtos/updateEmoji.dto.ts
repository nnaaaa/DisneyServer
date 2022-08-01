import { IsNotEmpty, IsUUID } from 'class-validator'
import { CreateEmojiDto } from './createEmoji.dto'

export class UpdateEmojiDto extends CreateEmojiDto {
    @IsUUID()
    @IsNotEmpty()
    emojiId: string
}
