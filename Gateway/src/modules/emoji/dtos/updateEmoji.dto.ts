import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateEmojiDto {
    @IsUUID()
    @IsNotEmpty()
    emojiId: string

    @IsString()
    @IsOptional()
    imageUrl: string
}
