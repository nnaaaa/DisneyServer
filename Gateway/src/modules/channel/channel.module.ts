import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { AuthModule } from '../auth/auth.module'
import { MemberModule } from '../member/member.module'
import { MemberService } from '../member/member.service'
import { MessageModule } from '../message/message.module'
import { MessageService } from '../message/message.service'
import { ChannelGateway } from './channel.gateway'
import { ChannelService } from './channel.service'

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ChannelEntity]), MessageModule, MemberModule],
    providers: [MemberService, MessageService, ChannelGateway, ChannelService],
    exports: [TypeOrmModule, ChannelService, MessageModule],
})
export class ChannelModule {}
