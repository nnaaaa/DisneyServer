import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MesssageEntity } from 'src/entities/message.entity'
import { MessageService } from './message.service'
import { MessageGateway } from './message.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([MesssageEntity])],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
