import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { GuildMemberEntity } from 'src/entities/guildMember.entity'
import { UserEntity } from 'src/entities/user.entity'
import { GuildMemberRepository } from 'src/repositories/userJoinGuild.repository'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

@Injectable()
export class GuildMemberService {
    public readonly guildMemberRelations: FindOptionsRelations<GuildMemberEntity> = {
        user: true,
        roles: { channels: true },
        joinedChannels: true,
        guild: true,
    }
    constructor(
        @InjectRepository(GuildMemberEntity)
        private userJoinGuildRepository: GuildMemberRepository
    ) {}

    async save(joinGuild: GuildMemberEntity) {
        return await this.userJoinGuildRepository.save(joinGuild)
    }
    async create(guild: GuildEntity, user: UserEntity) {
        const joinGuild = this.userJoinGuildRepository.create({
            guild,
            user,
            roles: [],
            joinedChannels: [],
        })

        joinGuild.nickname = user.name
        joinGuild.avatarUrl = user.avatarUrl

        return joinGuild
    }
    async findOneWithRelation(findCondition: FindOptionsWhere<GuildMemberEntity>) {
        return await this.userJoinGuildRepository.findOne({
            relations: this.guildMemberRelations,
            where: findCondition,
        })
    }

    async findManyWithRelation(findCondition: FindOptionsWhere<GuildMemberEntity>) {
        return await this.userJoinGuildRepository.find({
            relations: this.guildMemberRelations,
            where: findCondition,
        })
    }
    async updateOne(
        findCondition: FindOptionsWhere<GuildMemberEntity>,
        updateCondition: QueryDeepPartialEntity<GuildMemberEntity>
    ) {
        try {
            let joinGuild = await this.findOneWithRelation(findCondition)

            joinGuild = Object.assign(joinGuild, updateCondition)

            return this.save(joinGuild)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
    async delete(findCondition: FindOptionsWhere<GuildMemberEntity>) {
        try {
            const joinGuild = await this.findOneWithRelation(findCondition)
            await this.userJoinGuildRepository.remove(joinGuild)
            return joinGuild
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
