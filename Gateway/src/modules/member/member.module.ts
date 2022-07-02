import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MemberEntity } from 'src/entities/member.entity'
import { AuthModule } from '../auth/auth.module'
import { MessageModule } from '../message/message.module'
import { MessageService } from '../message/message.service'
import { ReactModule } from '../react/react.module'
import { ReactService } from '../react/react.service'
import { MemberGateway } from './member.gateway'
import { MemberService } from './member.service'

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([MemberEntity]),
        AuthModule,
        MessageModule,
        ReactModule,
    ],
    providers: [MessageService, ReactService, MemberService, MemberGateway],
    exports: [TypeOrmModule, MemberService, MemberGateway, MessageModule, ReactModule],
})
export class MemberModule {}
