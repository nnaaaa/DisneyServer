import { Server } from 'socket.io';
import { UserEntity } from 'src/entities/user.entity';
import { UserBeFriendEntity } from 'src/entities/userBeFriend.entity';
import { UserSocketEmit } from 'src/shared/socket.emit';
import { ChannelGateway } from '../channel/channel.gateway';
import { GuildMemberService } from './../guild-member/guild-member.service';
import { UpdateProfileDto } from './dtos/updateProfile.dto';
import { UserService } from './user.service';
export declare class UserGateway {
    private userService;
    private guildMemberService;
    private channelGateway;
    private readonly logger;
    readonly server: Server;
    constructor(userService: UserService, guildMemberService: GuildMemberService, channelGateway: ChannelGateway);
    get(authUser: UserEntity): Promise<UserEntity>;
    update(authUser: UserEntity, newProfile: UpdateProfileDto): Promise<void>;
    addFriend(friendId: string, authUser: UserEntity): Promise<void>;
    acceptFriend(friendId: string, authUser: UserEntity): Promise<void>;
    block(friendId: string, authUser: UserEntity): Promise<void>;
    friendInteractionNotify(event: UserSocketEmit, befriend: UserBeFriendEntity): void;
}
