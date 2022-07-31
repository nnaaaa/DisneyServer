import { SetMetadata } from '@nestjs/common'
import { Permission } from 'src/entities/role.entity'

export const RolePermission = (permission: Permission[]) =>
    SetMetadata('permissions', permission)
