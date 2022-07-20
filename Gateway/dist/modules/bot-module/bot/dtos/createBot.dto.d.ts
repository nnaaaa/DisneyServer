import { Permission } from 'src/entities/role.entity';
export declare class CreateBotDto {
    avatarUrl?: string;
    name: string;
    description: string;
    requiredPermissions: Permission[];
}
