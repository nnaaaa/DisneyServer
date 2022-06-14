import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { UserJoinGuildEntity } from 'src/entities/userJoinGuild.entity'
import { GuildService } from './guild.service'
import { GuildGateway } from './guild.gateway'
import { UtilityModule } from '../utility/utility.module'
import { UserModule } from '../user/user.module'
import { ChannelCategoryModule } from '../channel-category/channel-category.module'
import { ChannelCategoryService } from '../channel-category/channel-category.service'
import { ChannelService } from '../channel/channel.service'
import { ChannelModule } from '../channel/channel.module'

@Module({
  imports: [
    UtilityModule,
    TypeOrmModule.forFeature([GuildEntity, UserJoinGuildEntity]),
    UserModule,
    ChannelCategoryModule,
    ChannelModule,
  ],
  exports: [TypeOrmModule],
  providers: [
    GuildService,
    GuildGateway,
    ChannelCategoryService,
    ChannelService,
  ],
})
export class GuildModule {}
