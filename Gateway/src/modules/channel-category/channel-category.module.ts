import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity'
import { AuthModule } from '../auth/auth.module'
import { ChannelModule } from '../channel/channel.module'
import { ChannelService } from '../channel/channel.service'
import { ChannelCategoryGateway } from './channel-category.gateway'
import { ChannelCategoryService } from './channel-category.service'

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([ChannelCategoryEntity]),
        ChannelModule,
    ],
    providers: [ChannelCategoryGateway, ChannelCategoryService, ChannelService],
    exports: [TypeOrmModule, ChannelCategoryService, ChannelModule],
})
export class ChannelCategoryModule {}
