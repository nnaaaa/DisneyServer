import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { ChannelCategoryModule } from '../channel-category/channel-category.module'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { ChannelGateway } from '../channel/channel.gateway'
import { ChannelModule } from '../channel/channel.module'
import { ChannelService } from '../channel/channel.service'
import { GuildMemberModule } from '../guild-member/guild-member.module'
import { GuildMemberService } from '../guild-member/guild-member.service'
import { RoleModule } from '../role/role.module'
import { RoleService } from '../role/role.service'
import { UserModule } from '../user/user.module'
import { UtilityModule } from '../utility/utility.module'
import { GuildGateway } from './guild.gateway'
import { GuildService } from './guild.service'

@Module({
    imports: [
        UtilityModule,
        TypeOrmModule.forFeature([GuildEntity]),
        forwardRef(() => UserModule),
        forwardRef(() => ChannelCategoryModule),
        forwardRef(() => ChannelModule),
        forwardRef(() => RoleModule),
        GuildMemberModule,
    ],
    providers: [
        GuildMemberService,
        ChannelCategoryService,
        ChannelService,
        RoleService,
        GuildService,
        ChannelGateway,
        GuildGateway,
    ],
    exports: [TypeOrmModule, GuildService],
})
export class GuildModule {}
