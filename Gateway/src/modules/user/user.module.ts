import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserBeFriendEntity } from 'src/entities/userBeFriend.entity'
import { UserEntity } from '../../entities/user.entity'
import { AuthModule } from '../auth/auth.module'
import { UserController } from './user.controller'
import { UserGateway } from './user.gateway'
import { UserService } from './user.service'

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserEntity, UserBeFriendEntity]),
    ],
    providers: [UserService, UserGateway],
    controllers: [UserController],
    exports: [TypeOrmModule, UserService],
})
export class UserModule {}
