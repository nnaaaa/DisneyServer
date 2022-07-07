import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { AuthModule } from '../../auth-module/auth/auth.module'
import { EmojiModule } from '../../message-module/emoji/emoji.module'
import { EmojiService } from '../../message-module/emoji/emoji.service'
import { ChannelCategoryModule } from '../channel-category/channel-category.module'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { MemberModule } from '../member/member.module'
import { MemberService } from '../member/member.service'
import { RoleModule } from '../role/role.module'
import { RoleService } from '../role/role.service'
import { GuildController } from './guild.controller'
import { GuildGateway } from './guild.gateway'
import { GuildService } from './guild.service'

@Global()
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
    controllers: [GuildController],
})
export class GuildModule {}
