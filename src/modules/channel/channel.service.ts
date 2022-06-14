import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity'
import { UserJoinChannelEntity } from 'src/entities/userJoinChannel.entity'
import { ChannelRepository } from 'src/repositories/channel.repository'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { CreateChannelDto } from './dtos/createChannel.dto'

@Injectable()
export class ChannelService {
  public readonly joinChannelRelations: FindOptionsRelations<UserJoinChannelEntity> =
    {
      user: true,
    }
  public readonly channelRelations: FindOptionsRelations<ChannelEntity> = {
    messages: true,
    members: this.joinChannelRelations,
  }

  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepository: ChannelRepository
  ) {}

  async saveChannel(category: ChannelEntity) {
    return await this.channelRepository.save(category)
  }

  async createChannel(
    createChannelDto: CreateChannelDto,
    category: ChannelCategoryEntity
  ) {
    const channel = this.channelRepository.create({
      ...createChannelDto,
      category,
      messages: [],
      members: [],
    })
    return channel
  }
  async findOneChannel(findCondition: FindOptionsWhere<ChannelEntity>) {
    return await this.channelRepository.findOne({
      relations: this.channelRelations,
      where: findCondition,
    })
  }

  async findManyChannel(findCondition: FindOptionsWhere<ChannelEntity>) {
    return await this.channelRepository.find({
      relations: this.channelRelations,
      where: findCondition,
    })
  }
  async updateOneChannel(
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

  async deleteChannel(findCondition: FindOptionsWhere<ChannelEntity>) {
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
