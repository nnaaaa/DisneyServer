import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { GuildEntity } from 'src/entities/guild.entity'
import { RoleEntity } from 'src/entities/role.entity'
import { ChannelRepository } from 'src/repositories/channel.repository'
import { GuildRepository } from 'src/repositories/guild.repository'
import { RoleRepository } from 'src/repositories/role.repository'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { GuildMemberService } from '../guild-member/guild-member.service'
import { ChannelRoleDto } from './dtos/channelRole.dto'
import { CreateRoleDto } from './dtos/createRole.dto'
import { MemberRoleDto } from './dtos/memberRole.dto'

@Injectable()
export class RoleService {
    public readonly roleRelations: FindOptionsRelations<RoleEntity> = {
        members: true,
        channels: true,
    }

    constructor(
        @InjectRepository(RoleEntity) private roleRepository: RoleRepository,
        @InjectRepository(GuildEntity) private guildRepository: GuildRepository,
        @InjectRepository(ChannelEntity) private channelRepository: ChannelRepository,
        private guildMemberService: GuildMemberService
    ) {}
    async save(role: RoleEntity) {
        return await this.roleRepository.save(role)
    }

    async create(createDto: CreateRoleDto, guild: GuildEntity) {
        const role = this.roleRepository.create({
            ...createDto,
            guild,
            members: [],
            channels: [],
        })

        return role
    }

    async findOneWithReletion(findCondition: FindOptionsWhere<RoleEntity>) {
        return await this.roleRepository.findOne({
            where: findCondition,
            relations: this.roleRelations,
        })
    }

    async update(
        findCondition: FindOptionsWhere<RoleEntity>,
        updateCondition: QueryDeepPartialEntity<RoleEntity>
    ) {
        try {
            await this.roleRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
    async delete(findCondition: FindOptionsWhere<RoleEntity>) {
        try {
            const role = await this.findOneWithReletion(findCondition)

            role.channels = []
            role.members = []

            await this.roleRepository.remove(role)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async addToMember({ roleId, guildMemberId }: MemberRoleDto) {
        const role = await this.findOneWithReletion({ roleId })

        const member = await this.guildMemberService.findOneWithRelation({
            guildMemberId,
        })

        if (!member || !role) throw new NotFoundException()

        member.roles.push(role)
        role.members.push(member)

        await this.save(role)

        return { role, member }
    }

    async removeFromMember({ roleId, guildMemberId }: MemberRoleDto) {
        const role = await this.findOneWithReletion({ roleId })

        const member = await this.guildMemberService.findOneWithRelation({
            guildMemberId,
        })

        if (!member || !role) throw new NotFoundException()

        member.roles = member.roles.filter((role) => role.roleId !== roleId)

        role.members = role.members.filter(
            (member) => member.guildMemberId !== guildMemberId
        )

        await this.save(role)

        return { role, member }
    }

    async addToChannel({ roleId, channelId }: ChannelRoleDto) {
        const role = await this.findOneWithReletion({ roleId })

        const channel = await this.channelRepository.findOneBy({
            channelId,
        })

        if (!channel || !role) throw new NotFoundException()

        role.channels.push(channel)
        channel.roles.push(role)

        await this.save(role)
        return { role, channel }
    }

    async removeFromChannel({ roleId, channelId }: ChannelRoleDto) {
        const role = await this.findOneWithReletion({ roleId })

        const channel = await this.channelRepository.findOneBy({
            channelId,
        })

        if (!channel || !role) throw new NotFoundException()

        channel.roles = channel.roles.filter((role) => role.roleId !== roleId)

        role.channels = role.channels.filter((channel) => channel.channelId !== channelId)

        await this.save(role)

        return { role, channel }
    }

    async createByGuildIdAndSave(createDto: CreateRoleDto, guildId: string) {
        const guild = await this.guildRepository.findOneBy({ guildId })

        const role = await this.create(createDto, guild)

        const savedRole = await this.roleRepository.save(role)

        return savedRole
    }
}
