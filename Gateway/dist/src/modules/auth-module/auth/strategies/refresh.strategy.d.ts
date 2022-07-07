import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { UserService } from 'src/modules/auth-module/user/user.service'
import { UserTokenPayload } from '../dtos/tokenPayload.dto'
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private userService
    constructor(configService: ConfigService, userService: UserService)
    validate(req: Request, payload: UserTokenPayload): Promise<UserTokenPayload>
}
export {}
