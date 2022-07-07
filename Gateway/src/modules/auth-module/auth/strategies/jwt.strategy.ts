import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/modules/auth-module/user/user.service'
import { UserTokenPayload } from '../dtos/tokenPayload.dto'

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'userJwt') {
    constructor(configService: ConfigService, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('TOKEN_SECRET_KEY'),
        })
    }
    async validate(payload: UserTokenPayload) {
        const user = await this.userService.findOne({ userId: payload.userId })
        if (!user) throw new NotFoundException()
        return user
    }
}
