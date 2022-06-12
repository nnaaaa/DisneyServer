import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/modules/user/user.service'
import { TokenPayload } from '../dtos/TokenPayload.dto'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(configService: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('TOKEN_SECRET_KEY'),
      passReqToCallback: true,
    })
  }
  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = req.headers['authorization']
      .replace('Bearer', '')
      .trim()
    if (!refreshToken) throw new ForbiddenException()

    const user = await this.userService.findOne({ userId: payload.userId })
    if (!user) throw new NotFoundException()
    if (user.refreshToken !== refreshToken) throw new UnauthorizedException()

    return payload
  }
}
