import { Permission } from 'src/entities/role.entity'
export declare const RolePermissions: (
    permission: Permission[]
) => import('@nestjs/common').CustomDecorator<string>
