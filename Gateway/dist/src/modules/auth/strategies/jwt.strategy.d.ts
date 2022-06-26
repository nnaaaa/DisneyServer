import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { TokenPayload } from '../dtos/tokenPayload.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: TokenPayload): Promise<import("../../../entities/user.entity").UserEntity>;
}
export {};
