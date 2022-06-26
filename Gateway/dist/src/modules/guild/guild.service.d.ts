import { GuildEntity } from 'src/entities/guild.entity';
import { UserEntity } from 'src/entities/user.entity';
import { GuildRepository } from 'src/repositories/guild.repository';
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ChannelCategoryService } from '../channel-category/channel-category.service';
import { GuildMemberService } from '../guild-member/guild-member.service';
import { RoleService } from '../role/role.service';
import { ChannelService } from './../channel/channel.service';
import { CreateGuildDto } from './dtos/createGuild.dto';
export declare class GuildService {
    private channelCtgService;
    private channelService;
    private roleService;
    private guildMemberService;
    private guildRepository;
    readonly guildRelations: FindOptionsRelations<GuildEntity>;
    constructor(channelCtgService: ChannelCategoryService, channelService: ChannelService, roleService: RoleService, guildMemberService: GuildMemberService, guildRepository: GuildRepository);
    saveGuild(guild: GuildEntity): Promise<GuildEntity>;
    createGuild(createGuildDto: CreateGuildDto, creator: UserEntity): Promise<GuildEntity>;
    findOneGuild(findCondition: FindOptionsWhere<GuildEntity>): Promise<GuildEntity>;
    findOneGuildWithRelation(findCondition: FindOptionsWhere<GuildEntity>): Promise<GuildEntity>;
    findManyGuild(findCondition: FindOptionsWhere<GuildEntity>): Promise<GuildEntity[]>;
    updateOneGuild(findCondition: FindOptionsWhere<GuildEntity>, updateCondition: QueryDeepPartialEntity<GuildEntity>): Promise<void>;
    deleteGuild(findCondition: FindOptionsWhere<GuildEntity>): Promise<void>;
    createTemplateGuild(createGuildDto: CreateGuildDto, creator: UserEntity): Promise<GuildEntity>;
    joinGuild(guildId: string, user: UserEntity): Promise<{
        guild: GuildEntity;
        newMember: import("../../entities/guildMember.entity").GuildMemberEntity;
    }>;
    leaveGuild(userId: string, guildId: string): Promise<import("../../entities/guildMember.entity").GuildMemberEntity>;
}
