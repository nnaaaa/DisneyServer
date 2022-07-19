import { ChannelCategoryEntity } from './channelCategory.entity'
import { RoleEntity } from './role.entity'
import { MemberEntity } from './member.entity'
import { EmojiEntity } from './emoji.entity'
export declare class GuildEntity {
    guildId: string
    name: string
    avatarUrl: string
    members: MemberEntity[]
    roles: RoleEntity[]
    emojis: EmojiEntity[]
    categories: ChannelCategoryEntity[]
}
