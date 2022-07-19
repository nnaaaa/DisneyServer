'use strict'
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v)
    }
var __param =
    (this && this.__param) ||
    function (paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex)
        }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ChannelService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const channel_entity_1 = require('../../../entities/channel.entity')
const channel_repository_1 = require('../../../repositories/channel.repository')
const member_service_1 = require('../member/member.service')
const message_service_1 = require('../../message-module/message/message.service')
let ChannelService = class ChannelService {
    constructor(channelRepository, messageService, memberService) {
        this.channelRepository = channelRepository
        this.messageService = messageService
        this.memberService = memberService
        this.channelRelations = {
            roles: { members: { user: true } },
            members: { user: true },
        }
    }
    async save(category) {
        return await this.channelRepository.save(category)
    }
    async create(createChannelDto, category) {
        const channel = this.channelRepository.create(
            Object.assign(Object.assign({}, createChannelDto), {
                category,
                messages: [],
                members: [],
            })
        )
        return channel
    }
    async findOneWithRelation(findCondition) {
        return await this.channelRepository.findOne({
            relations: this.channelRelations,
            where: findCondition,
        })
    }
    async findMany(findCondition) {
        return await this.channelRepository.find({
            relations: this.channelRelations,
            where: findCondition,
        })
    }
    async updateOne(findCondition, updateCondition) {
        try {
            let channel = await this.findOneWithRelation(findCondition)
            channel = Object.assign(channel, updateCondition)
            return this.save(channel)
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteOne(findCondition) {
        try {
            const channel = await this.findOneWithRelation(findCondition)
            if (channel) {
                await this.messageService.deleteMany({
                    channel: { channelId: channel.channelId },
                })
                await this.channelRepository.remove(channel)
            }
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteMany(findCondition) {
        try {
            const channels = await this.findMany(findCondition)
            const removeChildren = []
            for (const channel of channels) {
                removeChildren.push(
                    this.messageService.deleteMany({
                        channel: { channelId: channel.channelId },
                    })
                )
            }
            await Promise.all(removeChildren)
            await this.channelRepository.remove(channels)
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async addMember({ channelId, memberId }) {
        const channel = await this.findOneWithRelation({ channelId })
        const member = await this.memberService.findOneWithRelation({
            memberId,
        })
        if (!member || !channel) throw new common_1.NotFoundException()
        member.joinedChannels.push(channel)
        channel.members.push(member)
        await this.save(channel)
        return { channel, member }
    }
    async removeMember({ channelId, memberId }) {
        const channel = await this.findOneWithRelation({ channelId })
        const member = await this.memberService.findOneWithRelation({
            memberId,
        })
        if (!member || !channel) throw new common_1.NotFoundException()
        member.joinedChannels = member.joinedChannels.filter(
            (c) => c.channelId !== channelId
        )
        channel.members = channel.members.filter((member) => member.memberId !== memberId)
        await this.save(channel)
        return { channel, member }
    }
}
ChannelService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(channel_entity_1.ChannelEntity)),
        __metadata('design:paramtypes', [
            channel_repository_1.ChannelRepository,
            message_service_1.MessageService,
            member_service_1.MemberService,
        ]),
    ],
    ChannelService
)
exports.ChannelService = ChannelService
//# sourceMappingURL=channel.service.js.map
