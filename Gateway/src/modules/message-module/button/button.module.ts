import { forwardRef, Module } from '@nestjs/common'
import { ButtonService } from './button.service'
import { ButtonGateway } from './button.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ButtonEntity } from 'src/entities/button.entity'
import { AuthModule } from 'src/modules/auth-module/auth/auth.module'
import { MemberModule } from 'src/modules/guild-module/member/member.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([ButtonEntity]),
        AuthModule,
        forwardRef(() => MemberModule),
    ],
    providers: [ButtonService, ButtonGateway],
    exports: [ButtonService, TypeOrmModule],
})
export class ButtonModule {}
