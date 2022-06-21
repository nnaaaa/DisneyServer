import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from 'src/entities/role.entity'
import { GuildModule } from '../guild/guild.module'
import { GuildService } from '../guild/guild.service'
import { UserModule } from '../user/user.module'
import { UtilityModule } from '../utility/utility.module'
import { RoleGateway } from './role.gateway'
import { RoleService } from './role.service'

@Module({
    imports: [
        UtilityModule,
        forwardRef(() => UserModule) ,
        forwardRef(() => GuildModule),
        TypeOrmModule.forFeature([RoleEntity]),
    ],
    providers: [RoleService, RoleGateway],
    exports: [TypeOrmModule, RoleService],
})
export class RoleModule {}
