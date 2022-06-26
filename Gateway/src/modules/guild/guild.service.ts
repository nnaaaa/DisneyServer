import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { UserEntity } from 'src/entities/user.entity'
import { GuildRepository } from 'src/repositories/guild.repository'
import { GuildDefault } from 'src/shared/guild.default'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { GuildMemberService } from '../guild-member/guild-member.service'
import { RoleService } from '../role/role.service'
import { ChannelService } from './../channel/channel.service'
import { CreateGuildDto } from './dtos/createGuild.dto'

@Injectable()
export class GuildService {
    public readonly guildRelations: FindOptionsRelations<GuildEntity> = {
        members: this.guildMemberService.guildMemberRelations,
        categories: this.channelCtgService.channelCtgRelations,
        roles: this.roleService.roleRelations,
    }

    constructor(
        private channelCtgService: ChannelCategoryService,
        private channelService: ChannelService,
        private roleService: RoleService,
        private guildMemberService: GuildMemberService,
        @InjectRepository(GuildEntity) private guildRepository: GuildRepository
    ) { }

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
            where: findCondition,
        })
    }

    async findOneGuildWithRelation(findCondition: FindOptionsWhere<GuildEntity>) {
        return await this.guildRepository.findOne({
            relations: this.guildRelations,
            where: findCondition,
        })
    }

    async findManyGuild(findCondition: FindOptionsWhere<GuildEntity>) {
        return await this.guildRepository.find({
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
            const guild = await this.findOneGuildWithRelation(findCondition)

            let removeChildren = []
            for (const ctg of guild.categories) {
                removeChildren.push(
                    this.channelService.delete({
                        category: { categoryId: ctg.categoryId },
                    })
                )
            }
            removeChildren = removeChildren.concat([
                this.channelCtgService.delete({
                    guild: { guildId: guild.guildId },
                }),
                this.guildMemberService.delete({
                    guild: { guildId: guild.guildId },
                }),
                this.roleService.delete({ guild: { guildId: guild.guildId } }),
            ])
            await Promise.all(removeChildren)

            await this.guildRepository.remove(guild)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async createTemplateGuild(createGuildDto: CreateGuildDto, creator: UserEntity) {
        const guild = await this.createGuild(createGuildDto, creator)
        const savedGuild = await this.saveGuild(guild)

        const joinedGuild = await this.guildMemberService.create(savedGuild, creator)
        const savedJoinedGuild = await this.guildMemberService.save(joinedGuild)

        const role = await this.roleService.create(
            { name: GuildDefault.everyOneRoleName },
            savedGuild
        )

        const category1 = await this.channelCtgService.create(
            { name: 'Category 1' },
            savedGuild
        )
        const category2 = await this.channelCtgService.create(
            { name: 'Category 2' },
            savedGuild
        )

        const savedCategory1 = await this.channelCtgService.save(category1)
        const savedCategory2 = await this.channelCtgService.save(category2)

        const channelLobby1 = await this.channelService.create(
            { name: 'lobby' },
            category1
        )
        channelLobby1.roles = [role]
        channelLobby1.members = [savedJoinedGuild]

        const channelDoc1 = await this.channelService.create(
            { name: 'document' },
            category1
        )
        channelDoc1.roles = [role]
        channelDoc1.members = [savedJoinedGuild]

        const channelLobby2 = await this.channelService.create(
            { name: 'lobby' },
            category2
        )
        channelLobby2.roles = [role]
        channelLobby2.members = [savedJoinedGuild]

        const channelDoc2 = await this.channelService.create(
            { name: 'document' },
            category2
        )
        channelDoc2.roles = [role]
        channelDoc2.members = [savedJoinedGuild]

        category1.channels = [channelLobby1, channelDoc1]
        category2.channels = [channelLobby2, channelDoc2]

        savedGuild.categories = [savedCategory1, savedCategory2]

        savedGuild.members = [savedJoinedGuild]

        savedGuild.roles = [role]

        const savedGuildTheSecond = await this.saveGuild(savedGuild)

        return savedGuildTheSecond
    }

    async joinGuild(guildId: string, user: UserEntity) {
        const guild = await this.findOneGuildWithRelation({ guildId })

        const defaultRoleInThisGuild = await this.roleService.findOneWithReletion({
            guild: { guildId },
            name: GuildDefault.everyOneRoleName,
        })

        const joinGuild = await this.guildMemberService.create(guild, user)

        if (defaultRoleInThisGuild) joinGuild.roles = [defaultRoleInThisGuild]

        guild.members.push(joinGuild)

        const savedJoinGuild = await this.guildMemberService.save(joinGuild)
        const savedGuild = await this.saveGuild(guild)

        return { guild: savedGuild, newMember: savedJoinGuild }
    }
    async leaveGuild(userId: string, guildId: string) {
        const joinGuild = await this.guildMemberService.delete({
            user: { userId },
            guild: { guildId },
        })

        return joinGuild
    }
}
