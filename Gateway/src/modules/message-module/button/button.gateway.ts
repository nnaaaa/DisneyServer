import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { RolePermissions } from 'src/shared/decorators/role-permission.decorator'
import { ActionDto } from 'src/shared/dtos/action.dto'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { ButtonSocketEmit } from 'src/shared/socket/emit'
import { ButtonSocketEvent } from 'src/shared/socket/event'
import { SocketNamespace } from 'src/shared/socket/namespace'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { ButtonService } from './button.service'
import { CreateButtonDto } from './dto/createButton.dto'
import { UpdateButtonDto } from './dto/updateButton.dto'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.BUTTON })
export class ButtonGateway {
    private readonly logger = new Logger(ButtonGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private buttonService: ButtonService) {}

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['CREATE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(ButtonSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('action') actionOfButton: ActionDto,
        @MessageBody('button') buttonOfButtonDto: CreateButtonDto
    ) {
        try {
            const button = await this.buttonService.create(
                buttonOfButtonDto,
                actionOfButton
            )

            this.server.emit(
                `${actionOfButton.actionId}/${ButtonSocketEmit.CREATE}`,
                button
            )
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(ButtonSocketEvent.UPDATE)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody('button') updateButtonDto: UpdateButtonDto) {
        try {
            const updatedButton = await this.buttonService.updateOne(updateButtonDto)

            this.server.emit(
                `${ButtonSocketEmit.UPDATE}/${updateButtonDto.buttonId}`,
                updatedButton
            )
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['DELETE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(ButtonSocketEvent.DELETE)
    async delete(@MessageBody('buttonId') buttonId: string) {
        try {
            await this.buttonService.deleteOne({ buttonId })

            this.server.emit(`${ButtonSocketEmit.DELETE}/${buttonId}`, buttonId)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
}
