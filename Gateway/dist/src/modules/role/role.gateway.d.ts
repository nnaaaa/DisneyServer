import { Server } from 'socket.io';
import { MemberRoleDto } from './dtos/memberRole.dto';
import { CreateRoleDto } from './dtos/createRole.dto';
import { UpdateRoleDto } from './dtos/updateRole.dto';
import { RoleService } from './role.service';
import { ChannelRoleDto } from './dtos/channelRole.dto';
import { ChannelGateway } from '../channel/channel.gateway';
import { RoleEntity } from 'src/entities/role.entity';
import { GuildGateway } from '../guild/guild.gateway';
export declare class RoleGateway {
    private roleService;
    private channelGateway;
    private guildGateway;
    private readonly logger;
    server: Server;
    constructor(roleService: RoleService, channelGateway: ChannelGateway, guildGateway: GuildGateway);
    create(createDto: CreateRoleDto, guildId: string): Promise<void>;
    update(updateRoleDto: UpdateRoleDto): Promise<void>;
    delete(roleId: string): Promise<void>;
    addToMember(memberRoleDto: MemberRoleDto): Promise<void>;
    removeFromMember(memberRoleDto: MemberRoleDto): Promise<void>;
    addToChannel(channelRoleDto: ChannelRoleDto): Promise<void>;
    removeFromChannel(channelRoleDto: ChannelRoleDto): Promise<void>;
    updateNotify(role: RoleEntity): void;
}
