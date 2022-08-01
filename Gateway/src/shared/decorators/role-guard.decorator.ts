import { applyDecorators, UseGuards } from '@nestjs/common'
import { Permission } from 'src/entities/role.entity'
import { GuildPermissionGuard } from '../guards/permission.guard'
import { RolePermission } from './role-permission.decorator'

export const RoleGuard = (permission: Permission[]) => {
    return applyDecorators(UseGuards(GuildPermissionGuard), RolePermission(permission))
}
