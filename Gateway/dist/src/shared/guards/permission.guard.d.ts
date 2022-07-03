import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { MemberService } from "src/modules/guild-module/member/member.service";
export declare class GuildPermissionGuard implements CanActivate {
    private reflector;
    private memberService;
    constructor(reflector: Reflector, memberService: MemberService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
