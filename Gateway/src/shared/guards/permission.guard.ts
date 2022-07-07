import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Permission } from 'src/entities/role.entity'
import { MemberService } from 'src/modules/guild-module/member/member.service'

@Injectable()
export class GuildPermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(MemberService) private memberService: MemberService
    ) {}

    async canActivate(context: ExecutionContext) {
        const data = context.switchToWs().getData()
        if (!data.memberId) return false

        const requiredPermissions = this.reflector.get<Permission[]>(
            'permissions',
            context.getHandler()
        )

        if (!requiredPermissions) return true

        const member = await this.memberService.findOneWithRelation({
            memberId: data.memberId,
        })

        if (!member) return false

        const isAdmitted = requiredPermissions.every((permission) =>
            member.roles.some((role) => role.permissions.includes(permission))
        )

        delete data.memberId

        return isAdmitted
    }
}
