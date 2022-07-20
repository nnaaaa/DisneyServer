import { Permission } from 'src/entities/role.entity';
export declare class CreateRoleDto {
    name: string;
    icon?: string;
    color?: string;
    permissions: Permission[];
}
