import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { ChannelService } from './channel.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'channel' })
export class ChannelGateway {
  constructor(private channelService: ChannelService) {}

  @SubscribeMessage('create')
  handleMessage(@MessageBody() payload: any) {}
}
