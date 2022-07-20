import { ChannelCategoryEntity } from './channelCategory.entity';
import { MemberEntity } from './member.entity';
import { MessageEntity } from './message.entity';
import { RoleEntity } from './role.entity';
export declare class ChannelEntity {
    channelId: string;
    name: string;
    isPrivate: boolean;
    messages: MessageEntity[];
    members: MemberEntity[];
    category: ChannelCategoryEntity;
    roles: RoleEntity[];
}
