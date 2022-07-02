import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from 'src/entities/role.entity'
import { AuthModule } from '../auth/auth.module'
import { ChannelModule } from '../channel/channel.module'
import { ChannelService } from '../channel/channel.service'
import { MemberModule } from '../member/member.module'
import { RoleGateway } from './role.gateway'
import { RoleService } from './role.service'

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([RoleEntity]),
        ChannelModule,
        MemberModule
    ],
    providers: [ChannelService,MemberModule, RoleService, RoleGateway],
    exports: [TypeOrmModule, RoleService],
})
export class RoleModule {}
