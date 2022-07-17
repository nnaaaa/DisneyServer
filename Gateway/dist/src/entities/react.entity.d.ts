import { ActionEntity } from './action.entity'
import { EmojiEntity } from './emoji.entity'
import { MemberEntity } from './member.entity'
export declare class ReactEntity {
    reactId: string
    author: MemberEntity
    action: ActionEntity
    emoji: EmojiEntity
}
