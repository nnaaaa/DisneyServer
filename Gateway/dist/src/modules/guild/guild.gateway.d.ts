import { Server } from 'socket.io';
import { GuildMemberEntity } from 'src/entities/guildMember.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ChannelGateway } from '../channel/channel.gateway';
import { GuildMemberService } from '../guild-member/guild-member.service';
import { RoleService } from '../role/role.service';
import { CreateGuildDto } from './dtos/createGuild.dto';
import { UpdateGuildDto } from './dtos/updateGuild.dto';
import { GuildService } from './guild.service';
export declare class GuildGateway {
    private guildService;
    private guildMemberService;
    private roleService;
    private channelGateway;
    private readonly logger;
    readonly server: Server;
    constructor(guildService: GuildService, guildMemberService: GuildMemberService, roleService: RoleService, channelGateway: ChannelGateway);
    create(authUser: UserEntity, createGuildDto: CreateGuildDto): Promise<import("../../entities/guild.entity").GuildEntity>;
    update(updateGuildDto: UpdateGuildDto): Promise<void>;
    getOne(guildId: string, authUser: UserEntity): Promise<{
        guild: import("../../entities/guild.entity").GuildEntity;
        member: GuildMemberEntity;
    }>;
    getOfMe({ userId }: UserEntity): Promise<import("../../entities/guild.entity").GuildEntity[]>;
    delete(guildId: string): Promise<void>;
    joinGuild(guildId: string, authUser: UserEntity): Promise<{
        guild: import("../../entities/guild.entity").GuildEntity;
        member: GuildMemberEntity;
    }>;
    leaveGuild(guildId: string, authUser: UserEntity): Promise<void>;
    updateMember(updateJoinGuildDto: UpdateGuildDto, authUser: UserEntity): Promise<void>;
    memberUpdateNotify(member: GuildMemberEntity): void;
}
