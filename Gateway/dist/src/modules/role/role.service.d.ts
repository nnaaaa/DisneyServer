import { ChannelEntity } from 'src/entities/channel.entity';
import { GuildEntity } from 'src/entities/guild.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { ChannelRepository } from 'src/repositories/channel.repository';
import { GuildRepository } from 'src/repositories/guild.repository';
import { RoleRepository } from 'src/repositories/role.repository';
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GuildMemberService } from '../guild-member/guild-member.service';
import { ChannelRoleDto } from './dtos/channelRole.dto';
import { CreateRoleDto } from './dtos/createRole.dto';
import { MemberRoleDto } from './dtos/memberRole.dto';
export declare class RoleService {
    private roleRepository;
    private guildRepository;
    private channelRepository;
    private guildMemberService;
    readonly roleRelations: FindOptionsRelations<RoleEntity>;
    constructor(roleRepository: RoleRepository, guildRepository: GuildRepository, channelRepository: ChannelRepository, guildMemberService: GuildMemberService);
    save(role: RoleEntity): Promise<RoleEntity>;
    create(createDto: CreateRoleDto, guild: GuildEntity): Promise<RoleEntity>;
    findOneWithReletion(findCondition: FindOptionsWhere<RoleEntity>): Promise<RoleEntity>;
    update(findCondition: FindOptionsWhere<RoleEntity>, updateCondition: QueryDeepPartialEntity<RoleEntity>): Promise<void>;
    delete(findCondition: FindOptionsWhere<RoleEntity>): Promise<void>;
    addToMember({ roleId, guildMemberId }: MemberRoleDto): Promise<{
        role: RoleEntity;
        member: import("../../entities/guildMember.entity").GuildMemberEntity;
    }>;
    removeFromMember({ roleId, guildMemberId }: MemberRoleDto): Promise<{
        role: RoleEntity;
        member: import("../../entities/guildMember.entity").GuildMemberEntity;
    }>;
    addToChannel({ roleId, channelId }: ChannelRoleDto): Promise<{
        role: RoleEntity;
        channel: ChannelEntity;
    }>;
    removeFromChannel({ roleId, channelId }: ChannelRoleDto): Promise<{
        role: RoleEntity;
        channel: ChannelEntity;
    }>;
    createByGuildIdAndSave(createDto: CreateRoleDto, guildId: string): Promise<RoleEntity>;
}
