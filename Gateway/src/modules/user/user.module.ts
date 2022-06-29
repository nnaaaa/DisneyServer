import { forwardRef, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserBeFriendEntity } from 'src/entities/userBeFriend.entity'
import { Service, ServiceName } from 'src/shared/services'
import { UserEntity } from '../../entities/user.entity'
import { ChannelCategoryModule } from '../channel-category/channel-category.module'
import { ChannelGateway } from '../channel/channel.gateway'
import { ChannelModule } from '../channel/channel.module'
import { GuildMemberModule } from '../guild-member/guild-member.module'
import { GuildMemberService } from '../guild-member/guild-member.service'
import { UtilityModule } from '../utility/utility.module'
import { UserController } from './user.controller'
import { UserGateway } from './user.gateway'
import { UserService } from './user.service'

@Module({
    imports: [
        UtilityModule,
        TypeOrmModule.forFeature([UserEntity, UserBeFriendEntity]),
        GuildMemberModule,
        forwardRef(() => ChannelCategoryModule),
        forwardRef(() => ChannelModule),
        ClientsModule.registerAsync([
            {
                name: ServiceName.MESSAGE,
                useFactory: Service.messageFactory,
                inject: [ConfigService]
            }
        ]),
    ],
    providers: [GuildMemberService, UserService, UserGateway, ChannelGateway],
    controllers: [UserController],
    exports: [TypeOrmModule, UserService],
})
export class UserModule {}
