import {
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from 'src/entities/role.entity'
import { RoleRepository } from 'src/repositories/role.repository'
import { GuildDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ChannelService } from '../channel/channel.service'
import { MemberService } from '../member/member.service'
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
        private channelService: ChannelService,
        private memberService: MemberService
    ) { }
    async save(role: RoleEntity) {
        return await this.roleRepository.save(role)
    }

    async create(createDto: CreateRoleDto, guild: GuildDto) {
        const role = this.roleRepository.create({
            ...createDto,
            guild,
            members: [],
            channels: [],
        })

        return role
    }

    async findOneWithRelation(findCondition: FindOptionsWhere<RoleEntity>) {
        return await this.roleRepository.findOne({
            where: findCondition,
            relations: this.roleRelations,
        })
    }

    async findManyWithReletion(findCondition: FindOptionsWhere<RoleEntity>) {
        return await this.roleRepository.find({
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
    async deleteMany(findCondition: FindOptionsWhere<RoleEntity>) {
        try {
            const roles = await this.findManyWithReletion(findCondition)

            for (const role of roles) {
                await this.roleRepository.remove(role)
            }
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
    async deleteOne(findCondition: FindOptionsWhere<RoleEntity>) {
        try {
            const role = await this.findOneWithRelation(findCondition)

            if (role) {
                await this.roleRepository.remove(role)
            }

            return role
            
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }


    async addToMember({ roleId, memberId }: MemberRoleDto) {
        const role = await this.findOneWithRelation({ roleId })
        const member = await this.memberService.findOneWithRelation({
            memberId,
        })
        if (!member || !role) throw new NotFoundException()
        member.roles.push(role)
        role.members.push(member)
        await this.save(role)
        return { role, member }
    }

    async removeFromMember({ roleId, memberId }: MemberRoleDto) {
        const role = await this.findOneWithRelation({ roleId })
        const member = await this.memberService.findOneWithRelation({
            memberId,
        })
        if (!member || !role) throw new NotFoundException()
        member.roles = member.roles.filter((role) => role.roleId !== roleId)
        role.members = role.members.filter(
            (member) => member.memberId !== memberId
        )
        await this.save(role)
        return { role, member }
    }

    async addToChannel({ roleId, channelId }: ChannelRoleDto) {
        const role = await this.findOneWithRelation({ roleId })
        const channel = await this.channelService.findOneWithRelation({
            channelId,
        })
        if (!channel || !role) throw new NotFoundException()
        role.channels.push(channel)
        channel.roles.push(role)
        await this.save(role)
        return { role, channel }
    }

    async removeFromChannel({ roleId, channelId }: ChannelRoleDto) {
        const role = await this.findOneWithRelation({ roleId })
        const channel = await this.channelService.findOneWithRelation({
            channelId,
        })
        if (!channel || !role) throw new NotFoundException()
        channel.roles = channel.roles.filter((role) => role.roleId !== roleId)
        role.channels = role.channels.filter((channel) => channel.channelId !== channelId)
        await this.save(role)
        return { role, channel }
    }

  
}
