import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/auth-module/user/user.service';
import { UserTokenPayload } from '../dtos/tokenPayload.dto';
declare const UserJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class UserJwtStrategy extends UserJwtStrategy_base {
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: UserTokenPayload): Promise<import("../../../../entities/user.entity").UserEntity>;
}
export {};
