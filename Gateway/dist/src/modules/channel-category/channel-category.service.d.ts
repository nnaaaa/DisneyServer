import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity';
import { GuildEntity } from 'src/entities/guild.entity';
import { ChannelCategoryRepository } from 'src/repositories/channelCategory.repository';
import { FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ChannelService } from '../channel/channel.service';
import { CreateChannelCtgDto } from './dtos/createChannelCtg.dto';
export declare class ChannelCategoryService {
    private channelService;
    private channelCtgRepository;
    readonly channelCtgRelations: {
        channels: import("typeorm").FindOptionsRelations<import("../../entities/channel.entity").ChannelEntity>;
    };
    constructor(channelService: ChannelService, channelCtgRepository: ChannelCategoryRepository);
    save(category: ChannelCategoryEntity): Promise<ChannelCategoryEntity>;
    create(createChannelCtgDto: CreateChannelCtgDto, guild: GuildEntity): Promise<ChannelCategoryEntity>;
    findOneWithRelation(findCondition: FindOptionsWhere<ChannelCategoryEntity>): Promise<ChannelCategoryEntity>;
    findMany(findCondition: FindOptionsWhere<ChannelCategoryEntity>): Promise<ChannelCategoryEntity[]>;
    updateOne(findCondition: FindOptionsWhere<ChannelCategoryEntity>, updateCondition: QueryDeepPartialEntity<ChannelCategoryEntity>): Promise<void>;
    delete(findCondition: FindOptionsWhere<ChannelCategoryEntity>): Promise<void>;
}
