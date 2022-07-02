import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { GuildDto } from 'src/shared/dtos'
import { ChannelCtgSocketEmit } from 'src/shared/socket/emit'
import { ChannelCtgSocketEvent } from 'src/shared/socket/event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { ChannelCategoryService } from './channel-category.service'
import { CreateChannelCtgDto } from './dtos/createChannelCtg.dto'
import { UpdateChannelCtgDto } from './dtos/updateChannelCtg.dto'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'channel-category' })
export class ChannelCategoryGateway {
    private readonly logger = new Logger(ChannelCategoryGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private channelCtgService: ChannelCategoryService) {}

    @SubscribeMessage(ChannelCtgSocketEvent.CREATE)
    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('category') createChannelCtgDto: CreateChannelCtgDto,
        @MessageBody('guild') guild: GuildDto
    ) {
        try {
            const channelCategory = await this.channelCtgService.create(
                createChannelCtgDto,
                guild
            )

            const savedChannelCategory = await this.channelCtgService.save(
                channelCategory
            )

            this.server.emit(
                `${guild.guildId}/${ChannelCtgSocketEmit.CREATE}`,
                savedChannelCategory
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @SubscribeMessage(ChannelCtgSocketEvent.UPDATE)
    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody() updateChannelCtgDto: UpdateChannelCtgDto) {
        try {
            await this.channelCtgService.updateOne(
                { categoryId: updateChannelCtgDto.categoryId },
                updateChannelCtgDto
            )

            this.server.emit(
                `${ChannelCtgSocketEmit.UPDATE}/${updateChannelCtgDto.categoryId}`,
                updateChannelCtgDto
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @SubscribeMessage(ChannelCtgSocketEvent.DELETE)
    @UseGuards(JwtWsGuard)
    async delete(@MessageBody() categoryId: string) {
        try {
            await this.channelCtgService.deleteOne({ categoryId })

            this.server.emit(`${ChannelCtgSocketEmit.DELETE}/${categoryId}`)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }
}
