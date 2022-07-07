import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { MemberEntity } from 'src/entities/member.entity'
import { MemberDto } from 'src/shared/dtos'
import { ChannelSocketEmit } from 'src/shared/socket/emit'
import { ChannelSocketEvent } from 'src/shared/socket/event'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { ChannelCategoryDto } from '../../../shared/dtos/channel-category.dto'
import { ChannelService } from './channel.service'
import { CreateChannelDto } from './dtos/createChannel.dto'
import { MemberChannelDto } from './dtos/memberChannel.dto'
import { UpdateChannelDto } from './dtos/updateChannel.dto'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { RolePermissions } from 'src/shared/decorators/role-permission.decorator'
import { SocketNamespace } from 'src/shared/socket/namespace'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.CHANNEL })
export class ChannelGateway {
    private readonly logger = new Logger(ChannelGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private channelService: ChannelService) {}

    @SubscribeMessage(ChannelSocketEvent.CREATE)
    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['CREATE_CHANNEL'])
    @UseGuards(GuildPermissionGuard)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('channel') createChannelDto: CreateChannelDto,
        @MessageBody('category') categoryDto: ChannelCategoryDto,
        @MessageBody('firstMember') firstMemberDto: MemberDto
    ) {
        try {
            const channel = await this.channelService.create(
                createChannelDto,
                categoryDto
            )

            channel.members.push(firstMemberDto as MemberEntity)

            const savedChannel = await this.channelService.save(channel)

            this.server.emit(
                `${categoryDto.categoryId}/${ChannelSocketEmit.CREATE}`,
                savedChannel
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @SubscribeMessage(ChannelSocketEvent.UPDATE)
    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_CHANNEL'])
    @UseGuards(GuildPermissionGuard)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody() updateChannelDto: UpdateChannelDto) {
        try {
            const channel = await this.channelService.updateOne(
                { channelId: updateChannelDto.channelId },
                updateChannelDto
            )
            this.server.emit(
                `${ChannelSocketEmit.UPDATE}/${updateChannelDto.channelId}`,
                channel
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
        // this.updateNotify(updateChannelDto as ChannelEntity)
    }
    @SubscribeMessage(ChannelSocketEvent.DELETE)
    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['DELETE_CHANNEL'])
    @UseGuards(GuildPermissionGuard)
    async delete(@MessageBody('channelId') channelId: string) {
        try {
            await this.channelService.deleteOne({ channelId })

            this.server.emit(`${ChannelSocketEmit.DELETE}/${channelId}`)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @SubscribeMessage(ChannelSocketEvent.ADD_MEMBER)
    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_CHANNEL'])
    @UseGuards(GuildPermissionGuard)
    @UsePipes(new ValidationPipe())
    async addMember(@MessageBody() memberChannelDto: MemberChannelDto) {
        try {
            const { channel, member } = await this.channelService.addMember(
                memberChannelDto
            )

            this.server.emit(`${ChannelSocketEmit.ADD_MEMBER}/${channel.channelId}`, {
                channel,
                member,
            })
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @SubscribeMessage(ChannelSocketEvent.REMOVE_MEMBER)
    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_CHANNEL'])
    @UseGuards(GuildPermissionGuard)
    @UsePipes(new ValidationPipe())
    async removeMember(@MessageBody() memberChannelDto: MemberChannelDto) {
        try {
            const { channel, member } = await this.channelService.removeMember(
                memberChannelDto
            )

            this.server.emit(`${ChannelSocketEmit.REMOVE_MEMBER}/${channel.channelId}`, {
                channel,
                member,
            })
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    // channelMemberNotify(event: ChannelSocketEmit, member: MemberEntity) {
    //     // emit to all channels have roles which user own
    //     for (const role of member.roles) {
    //         for (const channel of role.channels) {
    //             this.server.emit(`${event}/${channel.channelId}`, member)
    //         }
    //     }

    //     // emit to all channels which user joined
    //     for (const channel of member.joinedChannels) {
    //         this.server.emit(`${event}/${channel.channelId}`, member)
    //     }
    // }

    // updateNotify(channel: ChannelEntity) {
    //     this.server.emit(`${ChannelSocketEmit.UPDATE}/${channel.channelId}`, channel)
    // }
}
