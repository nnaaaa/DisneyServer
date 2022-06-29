import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from 'src/models/message.model';
import { User, UserDocument } from 'src/models/user.model';
import { UserService } from '../user/user.service';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { UpdateMessageDto } from './dtos/updateMessage.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private userService: UserService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const user = await this.userService.findOne(createMessageDto.userId);

    if (!user) throw new RpcException(new NotFoundException());

    const message = new this.messageModel(createMessageDto);
    message.author = user;
    return await message.save();
  }

  async updateOne(updateMessageDto: UpdateMessageDto) {
    const message = await this.messageModel.findByIdAndUpdate(updateMessageDto._id);
    return message;
  }

  async deleteOne(_id: string) {
    await this.messageModel.findByIdAndDelete(_id);
  }
}
