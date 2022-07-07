import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { UserEntity } from 'src/entities/user.entity'
import { GuildRepository } from 'src/repositories/guild.repository'
import { Default } from 'src/shared/default'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { EmojiService } from '../../message-module/emoji/emoji.service'
import { MemberService } from '../member/member.service'
import { RoleService } from '../role/role.service'
import { CreateGuildDto } from './dtos/createGuild.dto'

@Injectable()
export class GuildService {
    public readonly guildRelations: FindOptionsRelations<GuildEntity> = {
        members: this.memberService.guildMemberRelations,
        categories: this.channelCtgService.channelCtgRelations,
        roles: this.roleService.roleRelations,
        emojis: this.emojiService.emojiRelations,
    }

    constructor(
        private channelCtgService: ChannelCategoryService,
        private roleService: RoleService,
        private memberService: MemberService,
        private emojiService: EmojiService,
        @InjectRepository(GuildEntity) private guildRepository: GuildRepository
    ) {}

    async save(guild: GuildEntity) {
        return await this.guildRepository.save(guild)
    }

    async create(createGuildDto: CreateGuildDto, creator: UserEntity) {
        const guild = this.guildRepository.create({
            ...createGuildDto,
            categories: [],
            members: [],
        })
        return guild
    }
    async findOne(findCondition: FindOptionsWhere<GuildEntity>) {
        return await this.guildRepository.findOne({
            where: findCondition,
        })
    }

    async findOneWithRelation(findCondition: FindOptionsWhere<GuildEntity>) {
        return await this.guildRepository.findOne({
            relations: this.guildRelations,
            where: findCondition,
        })
    }

    async findMany(findCondition: FindOptionsWhere<GuildEntity>) {
        return await this.guildRepository.find({
            where: findCondition,
        })
    }
    async updateOne(
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

    async deleteOne(findCondition: FindOptionsWhere<GuildEntity>) {
        try {
            const guild = await this.findOneWithRelation(findCondition)

            if (guild) {
                let removeChildren = []
                removeChildren = removeChildren.concat([
                    this.channelCtgService.deleteMany({
                        guild: { guildId: guild.guildId },
                    }),
                    // this.memberService.deleteMany({
                    //     guild: { guildId: guild.guildId },
                    // }),
                    this.roleService.deleteMany({ guild: { guildId: guild.guildId } }),
                    this.emojiService.deleteMany({ guild: { guildId: guild.guildId } }),
                ])
                await Promise.all(removeChildren)
                await this.memberService.deleteMany({
                    guild: { guildId: guild.guildId },
                })

                await this.guildRepository.remove(guild)
            }
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async createTemplateGuild(createGuildDto: CreateGuildDto, creator: UserEntity) {
        const guild = await this.create(createGuildDto, creator)
        const savedGuild = await this.save(guild)

        const member = await this.memberService.create(savedGuild, creator)
        const savedMember = await this.memberService.save(member)

        const role = await this.roleService.create(
            { name: Default.everyOneRoleName, permissions: Default.everyOnePermission },
            savedGuild
        )

        savedMember.roles = [role]

        const category1 = await this.channelCtgService.createTemplateCategory(
            { name: 'TFT' },
            savedGuild,
            [member],
            [role]
        )
        const category2 = await this.channelCtgService.createTemplateCategory(
            { name: 'LOL' },
            savedGuild,
            [member],
            [role]
        )

        savedGuild.categories = [category1, category2]

        savedGuild.members = [savedMember]

        savedGuild.roles = [role]

        const savedGuildTheSecond = await this.save(savedGuild)

        return savedGuildTheSecond
    }
}
