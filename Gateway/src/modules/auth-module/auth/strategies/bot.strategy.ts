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
import { BotService } from 'src/modules/bot-module/bot/bot.service'
import { BotTokenPayload } from '../dtos/tokenPayload.dto'

@Injectable()
export class BotJwtStrategy extends PassportStrategy(Strategy, 'botJwt') {
    constructor(configService: ConfigService, private botService: BotService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('TOKEN_SECRET_KEY'),
            passReqToCallback: true,
        })
    }
    async validate(req: Request, payload: BotTokenPayload) {
        const bot = await this.botService.findOneWithRelation({ botId: payload.botId })
        if (!bot) throw new NotFoundException()

        const secreyKey = req.headers['authorization'].replace('Bearer', '').trim()
        if (!secreyKey) throw new ForbiddenException()

        if (bot.secretKey !== secreyKey) throw new UnauthorizedException()

        return bot
    }
}
