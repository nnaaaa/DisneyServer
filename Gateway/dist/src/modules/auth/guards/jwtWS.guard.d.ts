import { CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/modules/user/user.service'
export declare class JwtWsGuard implements CanActivate {
    private userService
    private jwtService
    constructor(userService: UserService, jwtService: JwtService)
    canActivate(context: ExecutionContext): Promise<boolean>
}
