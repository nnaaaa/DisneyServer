import { CommandEntity } from './command.entity';
import { MemberEntity } from './member.entity';
import { UserEntity } from './user.entity';
export declare class BotEntity {
    botId: string;
    avatarUrl: string;
    isListening: boolean;
    author: UserEntity;
    joinedGuilds: MemberEntity[];
    commands: CommandEntity[];
}
