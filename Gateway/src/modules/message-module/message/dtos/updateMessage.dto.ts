import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator'

export class UpdateMessageDto {
    @IsUUID()
    @IsNotEmpty()
    messageId: string

    @IsString()
    @IsOptional()
    content: string

    @IsArray()
    // @IsUrl({ each: true })
    @IsOptional()
    images: string
}
