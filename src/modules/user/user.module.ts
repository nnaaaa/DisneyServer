import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserBeFriendEntity } from 'src/entities/userBeFriend.entity'
import { UserEntity } from '../../entities/user.entity'
import { UtilityModule } from '../utility/utility.module'
import { UserController } from './user.controller'
import { UserGateway } from './user.gateway'
import { UserService } from './user.service'

@Module({
  imports: [
    UtilityModule,
    TypeOrmModule.forFeature([UserEntity, UserBeFriendEntity]),
  ],
  providers: [UserService, UserGateway],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
