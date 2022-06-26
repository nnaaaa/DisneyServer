import { ChannelEntity } from 'src/entities/channel.entity';
import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity';
import { ChannelRepository } from 'src/repositories/channel.repository';
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GuildMemberService } from '../guild-member/guild-member.service';
import { RoleService } from '../role/role.service';
import { CreateChannelDto } from './dtos/createChannel.dto';
export declare class ChannelService {
    private roleService;
    private guildMemberService;
    private channelRepository;
    readonly channelRelations: FindOptionsRelations<ChannelEntity>;
    constructor(roleService: RoleService, guildMemberService: GuildMemberService, channelRepository: ChannelRepository);
    save(category: ChannelEntity): Promise<ChannelEntity>;
    create(createChannelDto: CreateChannelDto, category: ChannelCategoryEntity): Promise<ChannelEntity>;
    findOne(findCondition: FindOptionsWhere<ChannelEntity>): Promise<ChannelEntity>;
    findMany(findCondition: FindOptionsWhere<ChannelEntity>): Promise<ChannelEntity[]>;
    updateOne(findCondition: FindOptionsWhere<ChannelEntity>, updateCondition: QueryDeepPartialEntity<ChannelEntity>): Promise<void>;
    delete(findCondition: FindOptionsWhere<ChannelEntity>): Promise<void>;
}
