import { GuildEntity } from 'src/entities/guild.entity'
import { UserEntity } from 'src/entities/user.entity'
import { GuildRepository } from 'src/repositories/guild.repository'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { EmojiService } from '../../message-module/emoji/emoji.service'
import { MemberService } from '../member/member.service'
import { RoleService } from '../role/role.service'
import { CreateGuildDto } from './dtos/createGuild.dto'
import { MessageEntity } from 'src/entities/message.entity'
export declare class GuildService {
    private channelCtgService
    readonly roleService: RoleService
    private memberService
    private emojiService
    private guildRepository
    readonly guildRelations: FindOptionsRelations<GuildEntity>
    constructor(
        channelCtgService: ChannelCategoryService,
        roleService: RoleService,
        memberService: MemberService,
        emojiService: EmojiService,
        guildRepository: GuildRepository
    )
    save(guild: GuildEntity): Promise<GuildEntity>
    create(createGuildDto: CreateGuildDto, creator: UserEntity): Promise<GuildEntity>
    findOne(findCondition: FindOptionsWhere<GuildEntity>): Promise<GuildEntity>
    findOneWithRelation(
        findCondition: FindOptionsWhere<GuildEntity>
    ): Promise<GuildEntity>
    findMany(findCondition: FindOptionsWhere<GuildEntity>): Promise<GuildEntity[]>
    updateOne(
        findCondition: FindOptionsWhere<GuildEntity>,
        updateCondition: QueryDeepPartialEntity<GuildEntity>
    ): Promise<void>
    deleteOne(findCondition: FindOptionsWhere<GuildEntity>): Promise<void>
    findByMessage(messagEntity: MessageEntity): Promise<GuildEntity>
    createTemplateGuild(
        createGuildDto: CreateGuildDto,
        creator: UserEntity
    ): Promise<GuildEntity>
}
