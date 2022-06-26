import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from 'src/entities/role.entity'
import { ChannelCategoryModule } from '../channel-category/channel-category.module'
import { ChannelGateway } from '../channel/channel.gateway'
import { ChannelModule } from '../channel/channel.module'
import { GuildMemberModule } from '../guild-member/guild-member.module'
import { GuildMemberService } from '../guild-member/guild-member.service'
import { GuildGateway } from '../guild/guild.gateway'
import { GuildModule } from '../guild/guild.module'
import { UserModule } from '../user/user.module'
import { UtilityModule } from '../utility/utility.module'
import { RoleGateway } from './role.gateway'
import { RoleService } from './role.service'

@Module({
    imports: [
        UtilityModule,
        forwardRef(() => UserModule),
        forwardRef(() => GuildModule),
        forwardRef(() => ChannelModule),
        forwardRef(() => ChannelCategoryModule),
        GuildMemberModule,
        TypeOrmModule.forFeature([RoleEntity]),
    ],
    providers: [GuildMemberService, RoleService, RoleGateway, ChannelGateway,GuildGateway],
    exports: [TypeOrmModule, RoleService],
})
export class RoleModule {}
