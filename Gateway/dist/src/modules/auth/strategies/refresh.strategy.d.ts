import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { TokenPayload } from '../dtos/tokenPayload.dto';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(req: Request, payload: TokenPayload): Promise<TokenPayload>;
}
export {};
