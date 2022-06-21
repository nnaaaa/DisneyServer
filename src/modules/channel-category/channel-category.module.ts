import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity'
import { ChannelModule } from '../channel/channel.module'
import { ChannelService } from '../channel/channel.service'
import { GuildModule } from '../guild/guild.module'
import { GuildService } from '../guild/guild.service'
import { UserModule } from '../user/user.module'
import { UtilityModule } from '../utility/utility.module'
import { ChannelCategoryGateway } from './channel-category.gateway'
import { ChannelCategoryService } from './channel-category.service'

@Module({
    imports: [
        UtilityModule,
        TypeOrmModule.forFeature([ChannelCategoryEntity]),
        forwardRef(()=> GuildModule),
        forwardRef(() => ChannelModule),
        forwardRef(()=> UserModule) ,
    ],
    exports: [TypeOrmModule, ChannelCategoryService],
    providers: [ChannelCategoryGateway, ChannelCategoryService, ChannelService,GuildService],
})
export class ChannelCategoryModule {}
