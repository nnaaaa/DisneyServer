import { Permission } from 'src/entities/role.entity';
export declare class BotDto {
    botId: string;
    name: string;
    avatarUrl: string;
    requiredPermissions: Permission[];
}
