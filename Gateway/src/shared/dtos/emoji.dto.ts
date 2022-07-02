import { IsNotEmpty, IsUUID } from 'class-validator'

export class EmojiDto {
    @IsUUID()
    @IsNotEmpty()
    emojiId: string
}
