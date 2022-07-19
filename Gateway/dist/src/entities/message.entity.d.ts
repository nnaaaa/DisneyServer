import { ActionEntity } from './action.entity'
import { ChannelEntity } from './channel.entity'
import { MemberEntity } from './member.entity'
export declare class MessageEntity {
    messageId: string
    content: string
    images: string[]
    createdAt: Date
    action: ActionEntity
    channel: ChannelEntity
    author: MemberEntity
    replyTo: MessageEntity
    replies: MessageEntity[]
}
