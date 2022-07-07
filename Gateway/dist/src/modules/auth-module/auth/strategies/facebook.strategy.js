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
exports.FacebookStrategy = void 0
const common_1 = require('@nestjs/common')
const config_1 = require('@nestjs/config')
const passport_1 = require('@nestjs/passport')
const passport_facebook_1 = require('passport-facebook')
let FacebookStrategy = class FacebookStrategy extends (0, passport_1.PassportStrategy)(
    passport_facebook_1.Strategy
) {
    constructor(configService) {
        super({
            clientID: configService.get('FACEBOOK_ID'),
            clientSecret: configService.get('FACEBOOK_SECRET'),
            callbackURL: `http://${configService.get('SERVER_HOST')}:${configService.get(
                'SERVER_PORT'
            )}/auth/facebook/redirect`,
            scope: ['user_photos', 'email', 'public_profile'],
        })
        this.configService = configService
    }
    async validate(accessToken, refreshToken, profile, done) {
        done(null, {
            profile,
            accessToken,
            refreshToken,
        })
    }
}
FacebookStrategy = __decorate(
    [
        (0, common_1.Injectable)(),
        __metadata('design:paramtypes', [config_1.ConfigService]),
    ],
    FacebookStrategy
)
exports.FacebookStrategy = FacebookStrategy
//# sourceMappingURL=facebook.strategy.js.map
