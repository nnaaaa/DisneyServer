import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity'
import { ChannelRepository } from 'src/repositories/channel.repository'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { GuildMemberService } from '../guild-member/guild-member.service'
import { RoleService } from '../role/role.service'
import { CreateChannelDto } from './dtos/createChannel.dto'

@Injectable()
export class ChannelService {
    public readonly channelRelations: FindOptionsRelations<ChannelEntity> = {
        messages: true,
        members: this.guildMemberService.guildMemberRelations,
        roles: this.roleService.roleRelations,
    }

    constructor(
        private roleService: RoleService,
        private guildMemberService: GuildMemberService,
        @InjectRepository(ChannelEntity)
        private channelRepository: ChannelRepository
    ) {}

    async save(category: ChannelEntity) {
        return await this.channelRepository.save(category)
    }

    async create(createChannelDto: CreateChannelDto, category: ChannelCategoryEntity) {
        const channel = this.channelRepository.create({
            ...createChannelDto,
            category,
            messages: [],
            members: [],
        })
        return channel
    }
    async findOne(findCondition: FindOptionsWhere<ChannelEntity>) {
        return await this.channelRepository.findOne({
            relations: this.channelRelations,
            where: findCondition,
        })
    }

    async findMany(findCondition: FindOptionsWhere<ChannelEntity>) {
        return await this.channelRepository.find({
            relations: this.channelRelations,
            where: findCondition,
        })
    }
    async updateOne(
        findCondition: FindOptionsWhere<ChannelEntity>,
        updateCondition: QueryDeepPartialEntity<ChannelEntity>
    ) {
        try {
            await this.channelRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async delete(findCondition: FindOptionsWhere<ChannelEntity>) {
        try {
            await this.channelRepository
                .createQueryBuilder()
                .delete()
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
