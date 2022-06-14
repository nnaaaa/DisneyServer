import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { UserEntity } from 'src/entities/user.entity'
import { UserJoinGuildEntity } from 'src/entities/userJoinGuild.entity'
import { GuildRepository } from 'src/repositories/guild.repository'
import { UserJoinGuildRepository } from 'src/repositories/userJoinGuild.repository'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { ChannelService } from '../channel/channel.service'
import { CreateGuildDto } from './dtos/createGuild.dto'

@Injectable()
export class GuildService {
    public readonly joinGuildRelations: FindOptionsRelations<UserJoinGuildEntity> =
        {
            user: true,
        }
    public readonly guildRelations: FindOptionsRelations<GuildEntity> = {
        members: this.joinGuildRelations,
        categories: { channels: true },
    }

    constructor(
        private channelCtgService: ChannelCategoryService,
        private channelService: ChannelService,
        @InjectRepository(GuildEntity) private guildRepository: GuildRepository,
        @InjectRepository(UserJoinGuildEntity)
        private userJoinGuildRepository: UserJoinGuildRepository
    ) { }

    async saveJoinGuild(joinGuild: UserJoinGuildEntity) {
        return await this.userJoinGuildRepository.save(joinGuild)
    }
    async createJoinGuild(guild: GuildEntity, user: UserEntity) {
        const joinGuild = this.userJoinGuildRepository.create({ guild, user })
        joinGuild.nickname = user.name
        joinGuild.avatarUrl = user.avatarUrl

        return joinGuild
    }
    async updateOneJoinGuild(
        findCondition: FindOptionsWhere<UserJoinGuildEntity>,
        updateCondition: QueryDeepPartialEntity<UserJoinGuildEntity>
    ) {
        try {
            await this.userJoinGuildRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
    async deleteJoinGuild(findCondition: FindOptionsWhere<UserJoinGuildEntity>) {
        try {
            const joinGuild = await this.userJoinGuildRepository.findOneBy(
                findCondition
            )
            await this.userJoinGuildRepository.remove(joinGuild)
            return joinGuild
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async saveGuild(guild: GuildEntity) {
        return await this.guildRepository.save(guild)
    }

    async createGuild(createGuildDto: CreateGuildDto, creator: UserEntity) {
        const guild = this.guildRepository.create({
            ...createGuildDto,
            categories: [],
            members: [],
        })
        return guild
    }
    async findOneGuild(findCondition: FindOptionsWhere<GuildEntity>) {
        return await this.guildRepository.findOne({
            relations: this.guildRelations,
            where: findCondition,
        })
    }

    async findManyGuild(findCondition: FindOptionsWhere<GuildEntity>) {
        return await this.guildRepository.find({
            relations: this.guildRelations,
            where: findCondition,
        })
    }
    async updateOneGuild(
        findCondition: FindOptionsWhere<GuildEntity>,
        updateCondition: QueryDeepPartialEntity<GuildEntity>
    ) {
        try {
            await this.guildRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteGuild(findCondition: FindOptionsWhere<GuildEntity>) {
        try {
            await this.guildRepository
                .createQueryBuilder()
                .delete()
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async createTemplateGuild(
        createGuildDto: CreateGuildDto,
        creator: UserEntity
    ) {
        const guild = await this.createGuild(createGuildDto, creator)
        const savedGuild = await this.saveGuild(guild)

        const joinGuild = await this.createJoinGuild(savedGuild, creator)

        const templateCategory1 =
            await this.channelCtgService.createTemplateCategory(
                { name: 'Category 1' },
                savedGuild
            )
        const templateCategory2 =
            await this.channelCtgService.createTemplateCategory(
                { name: 'Category 2' },
                savedGuild
            )

        savedGuild.categories = [templateCategory1, templateCategory2]
        savedGuild.members = [joinGuild]

        const savedGuildTheSecond = await this.saveGuild(savedGuild)

        return savedGuildTheSecond
    }

    async joinGuild(guildId: string, user: UserEntity) {
        const guild = await this.findOneGuild({ guildId })

        const joinGuild = await this.createJoinGuild(guild, user)

        guild.members.push(joinGuild)

        const savedGuild = await this.saveGuild(guild)
        return { guild: savedGuild, newMember: joinGuild }
    }
}
