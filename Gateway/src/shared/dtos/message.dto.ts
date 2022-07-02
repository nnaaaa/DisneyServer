import { IsNotEmpty, IsUUID } from 'class-validator'

export class MessageDto {
    @IsUUID()
    @IsNotEmpty()
    messageId: string
}
