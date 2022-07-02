import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { AuthModule } from '../auth/auth.module'
import { ChannelCategoryModule } from '../channel-category/channel-category.module'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { ChannelGateway } from '../channel/channel.gateway'
import { ChannelModule } from '../channel/channel.module'
import { ChannelService } from '../channel/channel.service'
import { EmojiModule } from '../emoji/emoji.module'
import { EmojiService } from '../emoji/emoji.service'
import { MemberModule } from '../member/member.module'
import { MemberService } from '../member/member.service'
import { MessageModule } from '../message/message.module'
import { ReactModule } from '../react/react.module'
import { RoleModule } from '../role/role.module'
import { RoleService } from '../role/role.service'
import { UserModule } from '../user/user.module'
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
