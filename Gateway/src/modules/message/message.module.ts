import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageEntity } from 'src/entities/message.entity'
import { AuthModule } from '../auth/auth.module'
import { ReactModule } from '../react/react.module'
import { ReactService } from '../react/react.service'
import { MessageGateway } from './message.gateway'
import { MessageService } from './message.service'

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity]), AuthModule, ReactModule],
    providers: [ReactService, MessageService, MessageGateway],
    exports: [TypeOrmModule, MessageService, ReactModule],
})
export class MessageModule { }
