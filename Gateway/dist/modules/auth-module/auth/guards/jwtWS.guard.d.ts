import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/auth-module/user/user.service';
import { BotService } from 'src/modules/bot-module/bot/bot.service';
export declare class JwtWsGuard implements CanActivate {
    private userService;
    private botService;
    private jwtService;
    constructor(userService: UserService, botService: BotService, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
