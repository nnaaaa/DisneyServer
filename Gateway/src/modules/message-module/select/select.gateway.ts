import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtUserWsGuard } from 'src/modules/auth-module/auth/guards/jwtWSUser.guard';
import { SelectSocketEmit } from 'src/shared/socket/emit';
import { SelectSocketEvent } from 'src/shared/socket/event';
import { SocketNamespace } from 'src/shared/socket/namespace';
import { UpdateOptionDto } from './dtos/updateOption.dto';
import { SelectService } from './select.service';

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.SELECT })
export class SelectGateway {

  private readonly logger = new Logger(SelectGateway.name)

  @WebSocketServer()
  server: Server

  constructor(private selectService: SelectService) { }

  @UseGuards(JwtUserWsGuard)
  @SubscribeMessage(SelectSocketEvent.SELECT)
  @UsePipes(new ValidationPipe())
  async select(@MessageBody() optionDto: UpdateOptionDto) {
    try {
      const option = await this.selectService.findOneWithRelation(optionDto)
      this.server.emit(
        `${option.select.action.actionId}/${SocketNamespace.SELECT}/${SelectSocketEmit.SELECT}`,
        option
      )
    } catch (e) {
      this.logger.error(e)
      return e
    }
  }
}
