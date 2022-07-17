import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageEntity } from 'src/entities/message.entity'
import { AuthModule } from '../../auth-module/auth/auth.module'
import { ActionModule } from '../action/action.module'
import { ActionService } from '../action/action.service'
import { MessageGateway } from './message.gateway'
import { MessageService } from './message.service'

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity]), AuthModule, ActionModule],
    providers: [ActionService, MessageService, MessageGateway],
    exports: [TypeOrmModule, MessageService, ActionModule],
})
export class MessageModule {}
