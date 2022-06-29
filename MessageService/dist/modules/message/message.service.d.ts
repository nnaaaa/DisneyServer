import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from 'src/models/message.model';
import { UserService } from '../user/user.service';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { UpdateMessageDto } from './dtos/updateMessage.dto';
export declare class MessageService {
    private messageModel;
    private userService;
    constructor(messageModel: Model<MessageDocument>, userService: UserService);
    create(createMessageDto: CreateMessageDto): Promise<Message & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    updateOne(updateMessageDto: UpdateMessageDto): Promise<Message & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    deleteOne(_id: string): Promise<void>;
}
