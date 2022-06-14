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
    ) { }

    async createTemplateCategory(
        createChannelCtgDto: CreateChannelCtgDto,
        guild: GuildEntity
    ) {
        const category = await this.create(createChannelCtgDto, guild)
        const savedCategory = await this.save(category)

        const channel = await this.channelService.createChannel(
            { name: 'lobby' },
            savedCategory
        )

        savedCategory.channels = [channel]

        return savedCategory
    }

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
    async findOne(findCondition: FindOptionsWhere<ChannelCategoryEntity>) {
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
            await this.channelCtgRepository
                .createQueryBuilder()
                .delete()
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
