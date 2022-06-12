import {
  CanActivate,
  ExecutionContext, Inject,
  Injectable
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { WsException } from '@nestjs/websockets'
import { UserService } from 'src/modules/user/user.service'
import { TokenPayload } from '../dtos/TokenPayload.dto'

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(JwtService) private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const client = context.switchToWs().getClient()
      if (
        !client.handshake.headers ||
        !client.handshake.headers.authorization
      ) {
        throw new WsException('No token')
      }
      const accessToken = client.handshake.headers.authorization
        .replace('Bearer', '')
        .trim()

      if (!accessToken) throw new WsException('No token')
      const tokenPayload: TokenPayload = this.jwtService.verify(accessToken)
      
      const user = await this.userService.findOne({ userId: tokenPayload.userId })
      if (!user) throw new WsException('Not found user')

      client.user = user
      return true
    } catch {
      return false
    }
  }
}
