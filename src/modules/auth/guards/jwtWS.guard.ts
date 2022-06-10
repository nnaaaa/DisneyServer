import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(@Inject(UserService) private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const client = context.switchToWs().getClient()
      if (
        !client.handshake.headers ||
        !client.handshake.headers.authorization
      ) {
        throw new UnauthorizedException()
      }
      const accessToken = client.handshake.headers.authorization
        .replace('Bearer', '')
        .trim()

      // const user = await this.userService.findOne({ userId: payload.userId });
      // if (!user) throw new UnauthorizedException();
      const users = await this.userService.findAll()
      return true
    } catch {
      return false
    }
  }
}
