import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { instanceToPlain } from 'class-transformer';
import { MessagePatternEvent } from 'src/shared/event.pattern';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { UpdateMessageDto } from './dtos/updateMessage.dto';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern(MessagePatternEvent.CREATE)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Payload('value') createMessageDto: CreateMessageDto) {
    return await this.messageService.create(createMessageDto);
  }

  @MessagePattern(MessagePatternEvent.UPDATE)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Payload('value') userUpdateDto: UpdateMessageDto) {
    const message = await this.messageService.updateOne(userUpdateDto);
    return message;
  }

  @EventPattern(MessagePatternEvent.DELETE)
  async delete(@Payload() _id: string) {
    await this.messageService.deleteOne(_id);
  }
}
