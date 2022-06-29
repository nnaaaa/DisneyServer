import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/models/message.model';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UserModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, UserService],
})
export class MessageModule {}
