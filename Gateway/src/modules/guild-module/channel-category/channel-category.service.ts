import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity'
import { GuildEntity } from 'src/entities/guild.entity'
import { MemberEntity } from 'src/entities/member.entity'
import { RoleEntity } from 'src/entities/role.entity'
import { ChannelCategoryRepository } from 'src/repositories/channelCategory.repository'
import { GuildDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ChannelService } from '../channel/channel.service'
import { CreateChannelCtgDto } from './dtos/createChannelCtg.dto'

@Injectable()
export class ChannelCategoryService {
    public readonly channelCtgRelations: FindOptionsRelations<ChannelCategoryEntity> = {
        channels: this.channelService.channelRelations,
    }
    constructor(
        private channelService: ChannelService,
        @InjectRepository(ChannelCategoryEntity)
        private channelCtgRepository: ChannelCategoryRepository
    ) {}

    async save(category: ChannelCategoryEntity) {
        return await this.channelCtgRepository.save(category)
    }

    async create(createChannelCtgDto: CreateChannelCtgDto, guild: GuildDto) {
        const category = this.channelCtgRepository.create({
            ...createChannelCtgDto,
            guild,
            channels: [],
        })
        return category
    }
    async findOneWithRelation(findCondition: FindOptionsWhere<ChannelCategoryEntity>) {
        return await this.channelCtgRepository.findOne({
            relations: this.channelCtgRelations,
            where: findCondition,
        })
    }

    async findManyWithRelation(findCondition: FindOptionsWhere<ChannelCategoryEntity>) {
        return await this.channelCtgRepository.find({
            relations: this.channelCtgRelations,
            where: findCondition,
        })
    }
    async updateOne(
        findCondition: FindOptionsWhere<ChannelCategoryEntity>,
        updateCondition: QueryDeepPartialEntity<ChannelCategoryEntity>
    ) {
        try {
            await this.channelCtgRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteMany(findCondition: FindOptionsWhere<ChannelCategoryEntity>) {
        try {
            const categories = await this.findManyWithRelation(findCondition)

            const removeChildren = []
            for (const category of categories) {
                removeChildren.push(
                    this.channelService.deleteMany({
                        category: { categoryId: category.categoryId },
                    })
                )
            }
            await Promise.all(removeChildren)

            await this.channelCtgRepository.remove(categories)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<ChannelCategoryEntity>) {
        try {
            const category = await this.findOneWithRelation(findCondition)

            if (category) {
                const removeChildren = []
                for (const channel of category.channels)
                    removeChildren.push(
                        this.channelService.deleteOne({ channelId: channel.channelId })
                    )

                await Promise.all(removeChildren)

                await this.channelCtgRepository.remove(category)
            }

            return category
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async createTemplateCategory(
        createCategoryDto: CreateChannelCtgDto,
        guild: GuildEntity,
        members: MemberEntity[],
        roles: RoleEntity[]
    ) {
        const category1 = await this.create(createCategoryDto, guild)
        const savedCategory = await this.save(category1)

        const channelLobby = await this.channelService.create(
            { name: 'lobby' },
            savedCategory
        )

        channelLobby.roles = roles
        channelLobby.members = members

        const channelDoc = await this.channelService.create(
            { name: 'document' },
            savedCategory
        )

        channelDoc.roles = roles
        channelDoc.members = members

        savedCategory.channels = [channelLobby, channelDoc]

        return savedCategory
    }
}
