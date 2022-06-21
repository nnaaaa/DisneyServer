import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity'
import { GuildEntity } from 'src/entities/guild.entity'
import { ChannelCategoryRepository } from 'src/repositories/channelCategory.repository'
import { FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ChannelService } from '../channel/channel.service'
import { CreateChannelCtgDto } from './dtos/createChannelCtg.dto'

@Injectable()
export class ChannelCategoryService {
    public readonly channelCtgRelations = {
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

    async create(createChannelCtgDto: CreateChannelCtgDto, guild: GuildEntity) {
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

    async findMany(findCondition: FindOptionsWhere<ChannelCategoryEntity>) {
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

    async delete(findCondition: FindOptionsWhere<ChannelCategoryEntity>) {
        try {
            const category = await this.findOneWithRelation(findCondition)

            const removeChildren = []
            for (const channel of category.channels)
                removeChildren.push(this.channelService.delete({ channelId: channel.channelId }))
            
            await Promise.all(removeChildren)
            
            await this.channelCtgRepository.remove(category)

        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    // async createTemplateCategory(
    //     createChannelCtgDto: CreateChannelCtgDto,
    //     guild: GuildEntity,
    //     member: GuildMemberEntity,
    //     role: RoleEntity
    // ) {
    //     const category = await this.create(createChannelCtgDto, guild)
    //     const savedCategory = await this.save(category)

    //     const channel1 = await this.channelService.createTemplateChannel(
    //         { name: 'lobby' },
    //         savedCategory,
    //         member,
    //         role
    //     )

    //     const channel2 = await this.channelService.createTemplateChannel(
    //         { name: 'document' },
    //         savedCategory,
    //         member,
    //         role
    //     )

    //     savedCategory.channels = [channel1, channel2]

    //     return savedCategory
    // }
}
