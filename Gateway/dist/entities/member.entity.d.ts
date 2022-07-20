import { BotEntity } from './bot.entity';
import { ChannelEntity } from './channel.entity';
import { GuildEntity } from './guild.entity';
import { MessageEntity } from './message.entity';
import { ReactEntity } from './react.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
export declare class MemberEntity {
    memberId: string;
    joinAt: Date;
    nickname: string;
    avatarUrl: string;
    user?: UserEntity;
    bot?: BotEntity;
    guild: GuildEntity;
    roles: RoleEntity[];
    joinedChannels: ChannelEntity[];
    sentMessages: MessageEntity[];
    sentReacts: ReactEntity[];
}
