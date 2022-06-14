import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity'
import { ChannelModule } from '../channel/channel.module'
import { ChannelService } from '../channel/channel.service'
import { ChannelCategoryGateway } from './channel-category.gateway'
import { ChannelCategoryService } from './channel-category.service'

@Module({
  imports: [TypeOrmModule.forFeature([ChannelCategoryEntity]), ChannelModule],
  exports: [TypeOrmModule],
  providers: [ChannelCategoryGateway, ChannelCategoryService, ChannelService],
})
export class ChannelCategoryModule {}
