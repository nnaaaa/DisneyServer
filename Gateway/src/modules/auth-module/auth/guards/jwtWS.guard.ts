import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { WsException } from '@nestjs/websockets'
import { UserService } from 'src/modules/auth-module/user/user.service'
import { BotService } from 'src/modules/bot-module/bot/bot.service'
import { BotTokenPayload, UserTokenPayload } from '../dtos/tokenPayload.dto'

@Injectable()
export class JwtWsGuard implements CanActivate {
    constructor(
        @Inject(UserService) private userService: UserService,
        @Inject(BotService) private botService: BotService,
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
            const tokenPayload: UserTokenPayload | BotTokenPayload =
                this.jwtService.verify(accessToken)

            if ((tokenPayload as UserTokenPayload)?.userId) {
                const user = await this.userService.findOne({
                    userId: (tokenPayload as UserTokenPayload)?.userId,
                })
                if (user) {
                    client.user = user
                    return true
                }
            }

            if ((tokenPayload as BotTokenPayload)?.botId) {
                const bot = await this.botService.findOneWithRelation({
                    botId: (tokenPayload as BotTokenPayload)?.botId,
                })

                if (bot) {
                    client.user = bot
                    return true
                }
            }

            return false
        } catch {
            return false
        }
    }
}
