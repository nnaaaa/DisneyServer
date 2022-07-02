import { IsNotEmpty, IsOptional, IsUrl, IsUUID } from 'class-validator'

export class CreateEmojiDto {
    @IsUrl()
    @IsOptional()
    imageUrl: string
}
