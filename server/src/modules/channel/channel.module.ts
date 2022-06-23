import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { ChannelCategoryModule } from '../channel-category/channel-category.module'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { GuildMemberModule } from '../guild-member/guild-member.module'
import { GuildMemberService } from '../guild-member/guild-member.service'
import { GuildModule } from '../guild/guild.module'
import { RoleModule } from '../role/role.module'
import { RoleService } from '../role/role.service'
import { UserModule } from '../user/user.module'
import { UtilityModule } from '../utility/utility.module'
import { ChannelGateway } from './channel.gateway'
import { ChannelService } from './channel.service'

@Module({
    imports: [
        UtilityModule,
        TypeOrmModule.forFeature([ChannelEntity]),
        forwardRef(() => RoleModule),
        forwardRef(() => GuildModule),
        forwardRef(() => ChannelCategoryModule),
        forwardRef(() => UserModule),
        GuildMemberModule,
    ],
    providers: [
        ChannelGateway,
        ChannelCategoryService,
        ChannelService,
        RoleService,
        GuildMemberService,
    ],
    exports: [
        TypeOrmModule,
        ChannelService,
        GuildMemberModule,
        RoleModule,
        ChannelGateway,
    ],
})
export class ChannelModule {}
