import { forwardRef, Module } from '@nestjs/common'
import { SelectService } from './select.service'
import { SelectGateway } from './select.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SelectEntity } from 'src/entities/select.entity'
import { OptionEntity } from 'src/entities/option.entity'
import { AuthModule } from 'src/modules/auth-module/auth/auth.module'
import { MemberModule } from 'src/modules/guild-module/member/member.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([SelectEntity, OptionEntity]),
        AuthModule,
        forwardRef(() => MemberModule)
    ],
    providers: [SelectService, SelectGateway],
    exports: [TypeOrmModule, SelectService],
})
export class SelectModule {}
