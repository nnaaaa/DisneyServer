import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { ChannelGateway } from './channel.gateway'
import { ChannelService } from './channel.service'

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity])],
  providers: [ChannelGateway, ChannelService],
})
export class ChannelModule {}
