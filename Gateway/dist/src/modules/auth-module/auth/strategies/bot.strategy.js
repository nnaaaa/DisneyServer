'use strict'
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v)
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.BotJwtStrategy = void 0
const common_1 = require('@nestjs/common')
const config_1 = require('@nestjs/config')
const passport_1 = require('@nestjs/passport')
const passport_jwt_1 = require('passport-jwt')
const bot_service_1 = require('../../../bot-module/bot/bot.service')
let BotJwtStrategy = class BotJwtStrategy extends (0, passport_1.PassportStrategy)(
    passport_jwt_1.Strategy,
    'botJwt'
) {
    constructor(configService, botService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('TOKEN_SECRET_KEY'),
            passReqToCallback: true,
        })
        this.botService = botService
    }
    async validate(req, payload) {
        const bot = await this.botService.findOneWithRelation({ botId: payload.botId })
        if (!bot) throw new common_1.NotFoundException()
        const secreyKey = req.headers['authorization'].replace('Bearer', '').trim()
        if (!secreyKey) throw new common_1.ForbiddenException()
        if (bot.secretKey !== secreyKey) throw new common_1.UnauthorizedException()
        return bot
    }
}
BotJwtStrategy = __decorate(
    [
        (0, common_1.Injectable)(),
        __metadata('design:paramtypes', [
            config_1.ConfigService,
            bot_service_1.BotService,
        ]),
    ],
    BotJwtStrategy
)
exports.BotJwtStrategy = BotJwtStrategy
//# sourceMappingURL=bot.strategy.js.map
