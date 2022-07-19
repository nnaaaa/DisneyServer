import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { BotService } from 'src/modules/bot-module/bot/bot.service'
import { BotTokenPayload } from '../dtos/tokenPayload.dto'
declare const BotJwtStrategy_base: new (...args: any[]) => Strategy
export declare class BotJwtStrategy extends BotJwtStrategy_base {
    private botService
    constructor(configService: ConfigService, botService: BotService)
    validate(
        req: Request,
        payload: BotTokenPayload
    ): Promise<import('../../../../entities/bot.entity').BotEntity>
}
export {}
