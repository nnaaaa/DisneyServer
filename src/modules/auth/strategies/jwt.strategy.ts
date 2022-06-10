import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/modules/user/user.service'
import { TokenPayload } from '../dtos/TokenPayload.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('TOKEN_SECRET_KEY'),
    })
  }
  async validate(payload: TokenPayload) {
    const user = await this.userService.findOne({ userId: payload.userId })
    if (!user) throw new UnauthorizedException()
    return user
  }
}
