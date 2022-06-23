import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { ChannelEntity } from 'src/entities/channel.entity'
import { GuildMemberEntity } from 'src/entities/guildMember.entity'
import { ChannelSocketEmit } from 'src/shared/socket.emit'
import { ChannelSocketEvent } from 'src/shared/socket.event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { ChannelService } from './channel.service'
import { CreateChannelDto } from './dtos/createChannel.dto'
import { UpdateChannelDto } from './dtos/updateChannel.dto'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'channel' })
export class ChannelGateway {
    @WebSocketServer()
    server: Server

    constructor(
        private channelService: ChannelService,
        private channelCtgService: ChannelCategoryService
    ) {}

    @SubscribeMessage(ChannelSocketEvent.CREATE)
    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('channel') createChannelDto: CreateChannelDto,
        @MessageBody('categoryId') categoryId: string
    ) {
        const category = await this.channelCtgService.findOneWithRelation({ categoryId })

        const channel = await this.channelService.create(createChannelDto, category)

        const savedChannel = await this.channelService.save(channel)

        this.server.emit(`${categoryId}/${ChannelSocketEmit.CREATE}`, savedChannel)
    }

    @SubscribeMessage(ChannelSocketEvent.UPDATE)
    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody() updateChannelDto: UpdateChannelDto) {
        await this.channelService.updateOne(
            { channelId: updateChannelDto.channelId },
            updateChannelDto
        )

        this.updateNotify(updateChannelDto as ChannelEntity)
    }
    @SubscribeMessage(ChannelSocketEvent.DELETE)
    @UseGuards(JwtWsGuard)
    async delete(@MessageBody() channelId: string) {
        await this.channelService.delete({ channelId })

        this.server.emit(`${ChannelSocketEmit.DELETE}/${channelId}`)
    }

    channelMemberNotify(event: ChannelSocketEmit, member: GuildMemberEntity) {
        // emit to all channels have roles which user own
        for (const role of member.roles) {
            for (const channel of role.channels) {
                this.server.emit(`${event}/${channel.channelId}`, member)
            }
        }

        // emit to all channels which user joined
        for (const channel of member.joinedChannels) {
            this.server.emit(`${event}/${channel.channelId}`, member)
        }
    }

    updateNotify(channel: ChannelEntity) {
        this.server.emit(
            `${ChannelSocketEmit.UPDATE}/${channel.channelId}`,
            channel
        )
    }
}
