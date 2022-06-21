import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { RoleEntity } from 'src/entities/role.entity'
import { GuildMemberEntity } from 'src/entities/guildMember.entity'
import { GuildRepository } from 'src/repositories/guild.repository'
import { RoleRepository } from 'src/repositories/role.repository'
import { Constant } from 'src/shared/constant'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { CreateRoleDto } from './dtos/createRole.dto'

@Injectable()
export class RoleService {
    public readonly roleRelations: FindOptionsRelations<RoleEntity> = {
        members: true,
        channels: true,
        
    }

    constructor(
        @InjectRepository(GuildEntity) private guildRepository: GuildRepository,
        @InjectRepository(RoleEntity) private roleRepository: RoleRepository
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

    async createByGuildIdAndSave(createDto: CreateRoleDto, guildId: string) {
        const guild = await this.guildRepository.findOneBy({ guildId })

        const role = await this.create(createDto, guild)

        const savedRole = await this.roleRepository.save(role)

        return savedRole
    }

    async createTempleteRole(guild: GuildEntity, member: GuildMemberEntity) {
        const role = await this.create(
            {
                name: Constant.everyOneRoleName,
            },
            guild
        )
        role.members = [member]

        return role
    }
}
