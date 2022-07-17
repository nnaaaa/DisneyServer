import { Inject, Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { BotEntity } from 'src/entities/bot.entity'
import { UserEntity } from 'src/entities/user.entity'
import { JwtWsGuard } from 'src/modules/auth-module/auth/guards/jwtWS.guard'
import { BotService } from 'src/modules/bot-module/bot/bot.service'
import { GuildService } from 'src/modules/guild-module/guild/guild.service'
import { Algorithm } from 'src/shared/utils/algorithms'
import { AuthWSUser } from 'src/shared/decorators/auth-user.decorator'
import { RolePermissions } from 'src/shared/decorators/role-permission.decorator'
import { ChannelDto, MemberDto } from 'src/shared/dtos'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { MessageSocketEmit } from 'src/shared/socket/emit'
import { MessageSocketEvent } from 'src/shared/socket/event'
import { SocketNamespace } from 'src/shared/socket/namespace'
import { In } from 'typeorm'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { CreateMessageDto } from './dtos/createMessage.dto'
import { UpdateMessageDto } from './dtos/updateMessage.dto'
import { MessageService } from './message.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.MESSAGE })
export class MessageGateway {
    private readonly logger = new Logger(MessageGateway.name)

    @WebSocketServer()
    server: Server

    constructor(
        private messageService: MessageService,
        @Inject(GuildService) private guildService: GuildService,
        @Inject(BotService) private botService: BotService
    ) {}

    @UseGuards(JwtUserWsGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(MessageSocketEvent.FIND)
    async find(@MessageBody('botId') botId: string) {
        try {
            const bot = await this.botService.findOneWithRelation({ botId })
            const messages = await this.messageService.findManyWithRelation({
                author: { memberId: In(bot.joinedGuilds.map((guild) => guild.memberId)) },
            })

            // this.server.emit(`${MessageSocketEmit.FIND}`, messages)

            return messages
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtWsGuard)
    @RolePermissions(['CREATE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(MessageSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('message') createMessageDto: CreateMessageDto,
        @MessageBody('channel') destinationDto: ChannelDto,
        @MessageBody('member') authorDto: MemberDto,
        @MessageBody('replyTo') replyTo: string,
        @AuthWSUser() userOrBot: BotEntity | UserEntity
    ) {
        try {
            const newMessage = await this.messageService.create(
                createMessageDto,
                destinationDto,
                authorDto,
                replyTo
            )

            const savedMessage = await this.messageService.save(newMessage)

            const [message, guild] = await Promise.all([
                this.messageService.findOneWithRelation({
                    messageId: savedMessage.messageId,
                }),
                this.guildService.findByMessage(savedMessage),
            ])

            const botList = await this.botService.findByGuild(guild)

            //emit to guild channels
            this.server.emit(
                `${destinationDto.channelId}/${MessageSocketEmit.CREATE}`,
                message
            )

            //emit to bot clients
            const inspected = Algorithm.inspectCommand(message.content)

            if (inspected) {
                botList.forEach((bot) => {
                    const { botName, args, name } = inspected

                    const isMatchCommand = bot.commands.some(
                        (command) =>
                            command.name === name && command.args.length === args.length
                    )

                    if (botName && botName === bot.name && isMatchCommand) {
                        this.server.emit(
                            `${bot.botId}/${SocketNamespace.MESSAGE}/${MessageSocketEmit.CREATE}`,
                            message,
                            inspected,
                            guild
                        )
                    }
                })
            }

            //emit to bot manager
            this.server.emit(
                `botManager/${(userOrBot as BotEntity)?.botId}/${
                    SocketNamespace.MESSAGE
                }/${MessageSocketEmit.CREATE}`,
                savedMessage
            )
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(MessageSocketEvent.UPDATE)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody() updateMessageDto: UpdateMessageDto) {
        try {
            this.messageService.updateOne(updateMessageDto)

            this.server.emit(
                `${MessageSocketEmit.UPDATE}/${updateMessageDto.messageId}`,
                updateMessageDto
            )
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['DELETE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(MessageSocketEvent.DELETE)
    async delete(@MessageBody('messageId') messageId: string) {
        try {
            this.messageService.deleteOne({ messageId })

            this.server.emit(`${MessageSocketEmit.DELETE}/${messageId}`, messageId)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
}
