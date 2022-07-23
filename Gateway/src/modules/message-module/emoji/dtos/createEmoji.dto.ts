import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class CreateEmojiDto {
    @IsUrl()
    @IsNotEmpty()
    imageUrl: string

    @IsNotEmpty()
    @IsString()
    name: string
}
