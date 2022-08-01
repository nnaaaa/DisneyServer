import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActionEntity } from 'src/entities/action.entity'
import { AuthModule } from 'src/modules/auth-module/auth/auth.module'
import { ButtonModule } from '../button/button.module'
import { ButtonService } from '../button/button.service'
import { ReactModule } from '../react/react.module'
import { ReactService } from '../react/react.service'
import { SelectModule } from '../select/select.module'
import { SelectService } from '../select/select.service'
import { ActionGateway } from './action.gateway'
import { ActionService } from './action.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([ActionEntity]),
        ButtonModule,
        ReactModule,
        SelectModule,
        AuthModule,
    ],
    providers: [SelectService, ButtonService, ReactService, ActionService, ActionGateway],
    exports: [TypeOrmModule, ActionService, ButtonModule, ReactModule, SelectModule],
})
export class ActionModule {}
