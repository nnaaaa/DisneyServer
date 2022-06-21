import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { ChannelCtgSocketEmit } from 'src/shared/socket.emit'
import { ChannelCtgSocketEvent } from 'src/shared/socket.event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { ChannelService } from '../channel/channel.service'
import { GuildService } from '../guild/guild.service'
import { ChannelCategoryService } from './channel-category.service'
import { CreateChannelCtgDto } from './dtos/createChannelCtg.dto'
import { UpdateChannelCtgDto } from './dtos/updateChannelCtg.dto'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'channel-category' })
export class ChannelCategoryGateway {
    @WebSocketServer()
    server: Server

    constructor(
        private channelService: ChannelService,
        private channelCtgService: ChannelCategoryService,
        private guildService: GuildService
    ) { }

    @SubscribeMessage(ChannelCtgSocketEvent.CREATE)
    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('category') createChannelCtgDto: CreateChannelCtgDto,
        @MessageBody('guildId') guildId: string
    ) {
        const guild = await this.guildService.findOneGuildWithRelation({ guildId })

        const channelCategory = await this.channelCtgService.create(createChannelCtgDto, guild)

        const savedChannelCategory = await this.channelCtgService.save(channelCategory)

        this.server.emit(`${guildId}/${ChannelCtgSocketEmit.CREATE}`, savedChannelCategory)

    }

    @SubscribeMessage(ChannelCtgSocketEvent.UPDATE)
    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody() updateChannelCtgDto: UpdateChannelCtgDto) {
        await this.channelCtgService.updateOne(
            { categoryId: updateChannelCtgDto.categoryId },
            updateChannelCtgDto
        )

        this.server.emit(
            `${ChannelCtgSocketEmit.UPDATE}/${updateChannelCtgDto.categoryId}`,
            updateChannelCtgDto
        )

    }

    @SubscribeMessage(ChannelCtgSocketEvent.DELETE)
    @UseGuards(JwtWsGuard)
    async delete(@MessageBody() categoryId: string) {
        await this.channelCtgService.delete({ categoryId })

        this.server.emit(`${ChannelCtgSocketEmit.DELETE}/${categoryId}`)
    }
}
