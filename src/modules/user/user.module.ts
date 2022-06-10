import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserBeFriendEntity } from 'src/entities/userBeFriend.entity'
import { UserJoinChannelEntity } from 'src/entities/userJoinChannel.entity'
import { UserEntity } from '../../entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserGateway } from './user.gateway'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserBeFriendEntity,
      UserJoinChannelEntity,
    ]),
  ],
  providers: [UserService, UserGateway],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
