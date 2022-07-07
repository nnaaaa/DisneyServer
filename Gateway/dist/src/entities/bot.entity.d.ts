import { CommandEntity } from './command.entity'
import { MemberEntity } from './member.entity'
import { Permission } from './role.entity'
import { UserEntity } from './user.entity'
export declare class BotEntity {
    botId: string
    avatarUrl: string
    name: string
    description: string
    secretKey: string
    isListening: boolean
    author: UserEntity
    joinedGuilds: MemberEntity[]
    commands: CommandEntity[]
    requiredPermissions: Permission[]
}