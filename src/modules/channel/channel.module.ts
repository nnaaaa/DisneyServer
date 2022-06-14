import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { UserJoinChannelEntity } from 'src/entities/userJoinChannel.entity'
import { ChannelGateway } from './channel.gateway'
import { ChannelService } from './channel.service'

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity, UserJoinChannelEntity])],
  providers: [ChannelGateway, ChannelService],
  exports: [TypeOrmModule, ChannelService],
})
export class ChannelModule {}
