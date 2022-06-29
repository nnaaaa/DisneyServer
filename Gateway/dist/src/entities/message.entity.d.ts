import { ChannelEntity } from './channel.entity';
import { UserEntity } from './user.entity';
export declare class MesssageEntity {
    messageId: string;
    content: string;
    images: string[];
    createAt: Date;
    channel: ChannelEntity;
    author: UserEntity;
    replyTo: MesssageEntity;
}
