import { CreateMessageDto } from './dtos/createMessage.dto';
import { UpdateMessageDto } from './dtos/updateMessage.dto';
import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(createMessageDto: CreateMessageDto): Promise<import("../../models/message.model").Message & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(userUpdateDto: UpdateMessageDto): Promise<import("../../models/message.model").Message & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(_id: string): Promise<void>;
}
