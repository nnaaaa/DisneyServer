import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { WsException } from '@nestjs/websockets'
import { UserService } from 'src/modules/auth-module/user/user.service'
import { UserTokenPayload } from '../dtos/tokenPayload.dto'

@Injectable()
export class JwtUserWsGuard implements CanActivate {
    constructor(
        @Inject(UserService) private userService: UserService,
        @Inject(JwtService) private jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext) {
        try {
            const client = context.switchToWs().getClient()
            if (!client.handshake.headers || !client.handshake.headers.authorization) {
                throw new WsException('Token is required')
            }
            const accessToken = client.handshake.headers.authorization
                .replace('Bearer', '')
                .trim()
            if (!accessToken) throw new WsException('Token is required')
            const tokenPayload: UserTokenPayload = this.jwtService.verify(accessToken)

            if (!tokenPayload.userId) throw new WsException('Token is invalid')

            const user = await this.userService.findOne({
                userId: tokenPayload.userId,
            })

            if (!user) throw new WsException('Not found user')

            client.user = user
            return true
        } catch {
            return false
        }
    }
}
