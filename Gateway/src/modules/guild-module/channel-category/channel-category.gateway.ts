import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { RoleGuard } from 'src/shared/decorators'
import { GuildDto } from 'src/shared/dtos'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { ChannelCtgSocketEmit } from 'src/shared/socket/emit'
import { ChannelCtgSocketEvent } from 'src/shared/socket/event'
import { SocketNamespace } from 'src/shared/socket/namespace'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { ChannelCategoryService } from './channel-category.service'
import { CreateChannelCtgDto } from './dtos/createChannelCtg.dto'
import { UpdateChannelCtgDto } from './dtos/updateChannelCtg.dto'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.CHANNEL_CATEGORY })
export class ChannelCategoryGateway {
    private readonly logger = new Logger(ChannelCategoryGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private channelCtgService: ChannelCategoryService) {}

    @SubscribeMessage(ChannelCtgSocketEvent.CREATE)
    @UseGuards(JwtUserWsGuard)
    @RoleGuard(['CREATE_CHANNEL'])
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
            return e
        }
    }

    @SubscribeMessage(ChannelCtgSocketEvent.UPDATE)
    @UseGuards(JwtUserWsGuard)
    @RoleGuard(['UPDATE_CHANNEL'])
    @UsePipes(new ValidationPipe())
    async update(@MessageBody('categoryId') updateChannelCtgDto: UpdateChannelCtgDto) {
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
            return e
        }
    }

    @SubscribeMessage(ChannelCtgSocketEvent.DELETE)
    @UseGuards(JwtUserWsGuard)
    @RoleGuard(['DELETE_CHANNEL'])
    async delete(@MessageBody() categoryId: string) {
        try {
            await this.channelCtgService.deleteOne({ categoryId })

            this.server.emit(`${ChannelCtgSocketEmit.DELETE}/${categoryId}`)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
}
