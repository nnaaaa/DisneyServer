import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { ChannelRepository } from 'src/repositories/channel.repository'
import { ChannelCategoryDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { MemberService } from '../member/member.service'
import { MessageService } from '../../message-module/message/message.service'
import { CreateChannelDto } from './dtos/createChannel.dto'
import { MemberChannelDto } from './dtos/memberChannel.dto'

@Injectable()
export class ChannelService {
    public readonly channelRelations: FindOptionsRelations<ChannelEntity> = {
        // messages: true,
        roles: { members: { user: true } },
        members: { user: true }
        // members: this.memberService.guildMemberRelations,
        // roles: this.roleService.roleRelations,
    }

    constructor(
        @InjectRepository(ChannelEntity)
        private channelRepository: ChannelRepository,
        private messageService: MessageService,
        private memberService: MemberService
    ) { }

    async save(category: ChannelEntity) {
        return await this.channelRepository.save(category)
    }

    async create(createChannelDto: CreateChannelDto, category: ChannelCategoryDto) {
        const channel = this.channelRepository.create({
            ...createChannelDto,
            category,
            messages: [],
            members: [],
        })
        return channel
    }
    async findOneWithRelation(findCondition: FindOptionsWhere<ChannelEntity>) {
        return await this.channelRepository.findOne({
            relations: this.channelRelations,
            where: findCondition,
        })
    }

    async findMany(findCondition: FindOptionsWhere<ChannelEntity>) {
        return await this.channelRepository.find({
            relations: this.channelRelations,
            where: findCondition,
        })
    }
    async updateOne(
        findCondition: FindOptionsWhere<ChannelEntity>,
        updateCondition: QueryDeepPartialEntity<ChannelEntity>
    ) {
        try {
            let channel = await this.findOneWithRelation(findCondition)

            channel = Object.assign(channel, updateCondition)

            return this.save(channel)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<ChannelEntity>) {
        try {
            const channel = await this.findOneWithRelation(findCondition)

            if (channel) {
                await this.messageService.deleteMany({ channel: { channelId: channel.channelId } })

                await this.channelRepository.remove(channel)
            }

        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteMany(findCondition: FindOptionsWhere<ChannelEntity>) {
        try {
            const channels = await this.findMany(findCondition)

            const removeChildren = []
            for (const channel of channels) {
                removeChildren.push(this.messageService.deleteMany({ channel: { channelId: channel.channelId } }))
            }
            await Promise.all(removeChildren)
            
            await this.channelRepository.remove(channels)
 
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async addMember({ channelId, memberId }: MemberChannelDto) {
        const channel = await this.findOneWithRelation({ channelId })
        const member = await this.memberService.findOneWithRelation({
            memberId,
        })
        if (!member || !channel) throw new NotFoundException()
        member.joinedChannels.push(channel)
        channel.members.push(member)
        await this.save(channel)
        return { channel, member }
    }

    async removeMember({ channelId, memberId }: MemberChannelDto) {
        const channel = await this.findOneWithRelation({ channelId })
        const member = await this.memberService.findOneWithRelation({
            memberId,
        })
        if (!member || !channel) throw new NotFoundException()
        member.joinedChannels = member.joinedChannels.filter((c) => c.channelId !== channelId)
        channel.members = channel.members.filter(
            (member) => member.memberId !== memberId
        )
        await this.save(channel)
        return { channel, member }
    }

}

