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
var __param =
    (this && this.__param) ||
    function (paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex)
        }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.JwtUserWsGuard = void 0
const common_1 = require('@nestjs/common')
const jwt_1 = require('@nestjs/jwt')
const websockets_1 = require('@nestjs/websockets')
const user_service_1 = require('../../user/user.service')
let JwtUserWsGuard = class JwtUserWsGuard {
    constructor(userService, jwtService) {
        this.userService = userService
        this.jwtService = jwtService
    }
    async canActivate(context) {
        try {
            const client = context.switchToWs().getClient()
            if (!client.handshake.headers || !client.handshake.headers.authorization) {
                throw new websockets_1.WsException('Token is required')
            }
            const accessToken = client.handshake.headers.authorization
                .replace('Bearer', '')
                .trim()
            if (!accessToken) throw new websockets_1.WsException('Token is required')
            const tokenPayload = this.jwtService.verify(accessToken)
            if (!tokenPayload.userId)
                throw new websockets_1.WsException('Token is invalid')
            const user = await this.userService.findOne({
                userId: tokenPayload.userId,
            })
            if (!user) throw new websockets_1.WsException('Not found user')
            client.user = user
            return true
        } catch (_a) {
            return false
        }
    }
}
JwtUserWsGuard = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)(user_service_1.UserService)),
        __param(1, (0, common_1.Inject)(jwt_1.JwtService)),
        __metadata('design:paramtypes', [user_service_1.UserService, jwt_1.JwtService]),
    ],
    JwtUserWsGuard
)
exports.JwtUserWsGuard = JwtUserWsGuard
//# sourceMappingURL=jwtWSUser.guard.js.map
