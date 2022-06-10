import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { ChannelRepository } from 'src/repositories/channel.repository'

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepository: ChannelRepository
  ) {}

  // async create(creator: userId) {

  // }
}
