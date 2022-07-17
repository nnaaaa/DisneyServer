import { IsNotEmpty, IsUUID } from 'class-validator'
import { CreateMessageDto } from './createMessage.dto'

export class UpdateMessageDto extends CreateMessageDto {
    @IsUUID()
    @IsNotEmpty()
    messageId: string
}
