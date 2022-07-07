import { Permission } from 'src/entities/role.entity'
export declare class UpdateBotDto {
    botId: string
    avatarUrl?: string
    name: string
    description: string
    requiredPermissions: Permission[]
}
