import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MesssageEntity } from 'src/entities/message.entity'
import { Service, ServiceName } from 'src/shared/services'
import { MessageGateway } from './message.gateway'
import { MessageService } from './message.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([MesssageEntity]),
        ClientsModule.registerAsync([
            {
                name: ServiceName.MESSAGE,
                useFactory: Service.messageFactory,
                inject: [ConfigService]
            }
        ])
    ],
    providers: [MessageService, MessageGateway],
})
export class MessageModule { }


