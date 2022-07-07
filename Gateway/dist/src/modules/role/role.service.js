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
exports.RoleService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const role_entity_1 = require('../../entities/role.entity')
const role_repository_1 = require('../../repositories/role.repository')
const channel_service_1 = require('../channel/channel.service')
const member_service_1 = require('../member/member.service')
let RoleService = class RoleService {
    constructor(roleRepository, channelService, memberService) {
        this.roleRepository = roleRepository
        this.channelService = channelService
        this.memberService = memberService
        this.roleRelations = {
            members: true,
            channels: true,
        }
    }
    async save(role) {
        return await this.roleRepository.save(role)
    }
    async create(createDto, guild) {
        const role = this.roleRepository.create(
            Object.assign(Object.assign({}, createDto), {
                guild,
                members: [],
                channels: [],
            })
        )
        return role
    }
    async findOneWithRelation(findCondition) {
        return await this.roleRepository.findOne({
            where: findCondition,
            relations: this.roleRelations,
        })
    }
    async findManyWithReletion(findCondition) {
        return await this.roleRepository.find({
            where: findCondition,
            relations: this.roleRelations,
        })
    }
    async update(findCondition, updateCondition) {
        try {
            await this.roleRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteMany(findCondition) {
        try {
            const roles = await this.findManyWithReletion(findCondition)
            for (const role of roles) {
                await this.roleRepository.remove(role)
            }
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteOne(findCondition) {
        try {
            const role = await this.findOneWithRelation(findCondition)
            if (role) {
                await this.roleRepository.remove(role)
            }
            return role
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async addToMember({ roleId, memberId }) {
        const role = await this.findOneWithRelation({ roleId })
        const member = await this.memberService.findOneWithRelation({
            memberId,
        })
        if (!member || !role) throw new common_1.NotFoundException()
        member.roles.push(role)
        role.members.push(member)
        await this.save(role)
        return { role, member }
    }
    async removeFromMember({ roleId, memberId }) {
        const role = await this.findOneWithRelation({ roleId })
        const member = await this.memberService.findOneWithRelation({
            memberId,
        })
        if (!member || !role) throw new common_1.NotFoundException()
        member.roles = member.roles.filter((role) => role.roleId !== roleId)
        role.members = role.members.filter((member) => member.memberId !== memberId)
        await this.save(role)
        return { role, member }
    }
    async addToChannel({ roleId, channelId }) {
        const role = await this.findOneWithRelation({ roleId })
        const channel = await this.channelService.findOneWithRelation({
            channelId,
        })
        if (!channel || !role) throw new common_1.NotFoundException()
        role.channels.push(channel)
        channel.roles.push(role)
        await this.save(role)
        return { role, channel }
    }
    async removeFromChannel({ roleId, channelId }) {
        const role = await this.findOneWithRelation({ roleId })
        const channel = await this.channelService.findOneWithRelation({
            channelId,
        })
        if (!channel || !role) throw new common_1.NotFoundException()
        channel.roles = channel.roles.filter((role) => role.roleId !== roleId)
        role.channels = role.channels.filter((channel) => channel.channelId !== channelId)
        await this.save(role)
        return { role, channel }
    }
}
RoleService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
        __metadata('design:paramtypes', [
            role_repository_1.RoleRepository,
            channel_service_1.ChannelService,
            member_service_1.MemberService,
        ]),
    ],
    RoleService
)
exports.RoleService = RoleService
//# sourceMappingURL=role.service.js.map
