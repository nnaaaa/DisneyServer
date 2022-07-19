import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity'
import { GuildEntity } from 'src/entities/guild.entity'
import { MemberEntity } from 'src/entities/member.entity'
import { RoleEntity } from 'src/entities/role.entity'
import { ChannelCategoryRepository } from 'src/repositories/channelCategory.repository'
import { GuildDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ChannelService } from '../channel/channel.service'
import { CreateChannelCtgDto } from './dtos/createChannelCtg.dto'
export declare class ChannelCategoryService {
    private channelService
    private channelCtgRepository
    readonly channelCtgRelations: FindOptionsRelations<ChannelCategoryEntity>
    constructor(
        channelService: ChannelService,
        channelCtgRepository: ChannelCategoryRepository
    )
    save(category: ChannelCategoryEntity): Promise<ChannelCategoryEntity>
    create(
        createChannelCtgDto: CreateChannelCtgDto,
        guild: GuildDto
    ): Promise<ChannelCategoryEntity>
    findOneWithRelation(
        findCondition: FindOptionsWhere<ChannelCategoryEntity>
    ): Promise<ChannelCategoryEntity>
    findManyWithRelation(
        findCondition: FindOptionsWhere<ChannelCategoryEntity>
    ): Promise<ChannelCategoryEntity[]>
    updateOne(
        findCondition: FindOptionsWhere<ChannelCategoryEntity>,
        updateCondition: QueryDeepPartialEntity<ChannelCategoryEntity>
    ): Promise<void>
    deleteMany(findCondition: FindOptionsWhere<ChannelCategoryEntity>): Promise<void>
    deleteOne(
        findCondition: FindOptionsWhere<ChannelCategoryEntity>
    ): Promise<ChannelCategoryEntity>
    createTemplateCategory(
        createCategoryDto: CreateChannelCtgDto,
        guild: GuildEntity,
        members: MemberEntity[],
        roles: RoleEntity[]
    ): Promise<ChannelCategoryEntity>
}
