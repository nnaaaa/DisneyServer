import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AuthUser } from 'src/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard'
import { UserSocketEvent } from 'src/shared/socket.event'
import { UserGateway } from './user.gateway'
import { UserService } from './user.service'

@Controller('user')
@UseInterceptors(CacheInterceptor)
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private userGateway: UserGateway
  ) {}
  @Get('profile')
  async getProfile(@AuthUser() authUser: UserEntity) {
    const user = await this.userService.findOne({
      userId: authUser.userId,
    })
    await this.userService.updateOne(
      { userId: authUser.userId },
      { isOnline: true }
    )
    for (const friend of user.friends)
      this.userGateway.server.emit(`${UserSocketEvent.ONLINE}/${friend.id}`)
    return user
  }

  @Post('addFriend/:id')
  async addFriend(
    @Param('id') friendId: string,
    @AuthUser() authUser: UserEntity
  ) {
    const beFriend = await this.userService.addFriend({
      friendId,
      userId: authUser.userId,
    })
    this.userGateway.server.emit(
      `${UserSocketEvent.ADD_FRIEND}/${beFriend.rightUser.userId}`,
      beFriend
    )
  }
}
