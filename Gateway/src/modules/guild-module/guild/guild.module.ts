import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { AuthModule } from '../../auth-module/auth/auth.module'
import { ChannelCategoryModule } from '../channel-category/channel-category.module'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { ChannelGateway } from '../channel/channel.gateway'
import { ChannelModule } from '../channel/channel.module'
import { ChannelService } from '../channel/channel.service'
import { EmojiModule } from '../../message-module/emoji/emoji.module'
import { EmojiService } from '../../message-module/emoji/emoji.service'
import { MemberModule } from '../member/member.module'
import { MemberService } from '../member/member.service'
import { MessageModule } from '../../message-module/message/message.module'
import { ReactModule } from '../../message-module/react/react.module'
import { RoleModule } from '../role/role.module'
import { RoleService } from '../role/role.service'
import { UserModule } from '../../auth-module/user/user.module'
import { GuildGateway } from './guild.gateway'
import { GuildService } from './guild.service'

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([GuildEntity]),
        ChannelCategoryModule,
        RoleModule,
        EmojiModule,
        MemberModule,
    ],
    providers: [
        EmojiService,
        MemberService,
        ChannelCategoryService,
        RoleService,
        GuildService,
        GuildGateway,
    ],
    exports: [
        TypeOrmModule,
        GuildService,
        ChannelCategoryModule,
        RoleModule,
        EmojiModule,
        MemberModule,
    ],
})
export class GuildModule {}
