import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { OptionEntity } from 'src/entities/option.entity'
import { UserEntity } from 'src/entities/user.entity'
import { JwtUserWsGuard } from 'src/modules/auth-module/auth/guards/jwtWSUser.guard'
import { MemberService } from 'src/modules/guild-module/member/member.service'
import { AuthWSUser } from 'src/shared/decorators'
import { SelectSocketEmit } from 'src/shared/socket/emit'
import { SelectSocketEvent } from 'src/shared/socket/event'
import { SocketNamespace } from 'src/shared/socket/namespace'
import { UpdateOptionDto } from './dtos/updateOption.dto'
import { SelectService } from './select.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.SELECT })
export class SelectGateway {
    private readonly logger = new Logger(SelectGateway.name)

    @WebSocketServer()
    server: Server

    constructor(
        private selectService: SelectService,
        private memberService: MemberService
    ) { }

    @UseGuards(JwtUserWsGuard)
    @SubscribeMessage(SelectSocketEvent.SELECT)
    @UsePipes(new ValidationPipe())
    async select(@MessageBody() optionDto: UpdateOptionDto,@AuthWSUser() user:UserEntity) {
        try {
            const option = await this.selectService.findOptionWithRelation(optionDto)

            const member = await this.memberService.findByUserAndSelect(user,optionDto as OptionEntity)

            this.server.emit(
                `${option.select.action.actionId}/${SocketNamespace.SELECT}/${SelectSocketEmit.SELECT}`,
                {
                    option,
                    selector: member
                }
            )
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
}
