import { ChannelEntity } from 'src/entities/channel.entity'
import { ChannelRepository } from 'src/repositories/channel.repository'
import { ChannelCategoryDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { MemberService } from '../member/member.service'
import { MessageService } from '../../message-module/message/message.service'
import { CreateChannelDto } from './dtos/createChannel.dto'
import { MemberChannelDto } from './dtos/memberChannel.dto'
export declare class ChannelService {
    private channelRepository
    private messageService
    private memberService
    readonly channelRelations: FindOptionsRelations<ChannelEntity>
    constructor(
        channelRepository: ChannelRepository,
        messageService: MessageService,
        memberService: MemberService
    )
    save(category: ChannelEntity): Promise<ChannelEntity>
    create(
        createChannelDto: CreateChannelDto,
        category: ChannelCategoryDto
    ): Promise<ChannelEntity>
    findOneWithRelation(
        findCondition: FindOptionsWhere<ChannelEntity>
    ): Promise<ChannelEntity>
    findMany(findCondition: FindOptionsWhere<ChannelEntity>): Promise<ChannelEntity[]>
    updateOne(
        findCondition: FindOptionsWhere<ChannelEntity>,
        updateCondition: QueryDeepPartialEntity<ChannelEntity>
    ): Promise<ChannelEntity>
    deleteOne(findCondition: FindOptionsWhere<ChannelEntity>): Promise<void>
    deleteMany(findCondition: FindOptionsWhere<ChannelEntity>): Promise<void>
    addMember({ channelId, memberId }: MemberChannelDto): Promise<{
        channel: ChannelEntity
        member: import('../../../entities/member.entity').MemberEntity
    }>
    removeMember({ channelId, memberId }: MemberChannelDto): Promise<{
        channel: ChannelEntity
        member: import('../../../entities/member.entity').MemberEntity
    }>
}
