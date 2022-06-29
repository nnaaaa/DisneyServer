import { ChannelCategoryEntity } from './channelCategory.entity'
import { RoleEntity } from './role.entity'
import { GuildMemberEntity } from './guildMember.entity'
export declare class GuildEntity {
    guildId: string
    name: string
    avatarUrl: string
    members: GuildMemberEntity[]
    roles: RoleEntity[]
    categories: ChannelCategoryEntity[]
}
