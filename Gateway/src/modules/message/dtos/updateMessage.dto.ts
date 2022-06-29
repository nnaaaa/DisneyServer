import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateMessageDto {
    @IsUUID()
    @IsNotEmpty()
    messageId: string

    @IsString()
    @IsOptional()
    content: string

    @IsArray()
    @IsOptional()
    images: string
}
