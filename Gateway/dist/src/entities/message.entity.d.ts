import { ChannelEntity } from './channel.entity'
import { MemberEntity } from './member.entity'
import { ReactEntity } from './react.entity'
export declare class MessageEntity {
    messageId: string
    content: string
    images: string[]
    createdAt: Date
    channel: ChannelEntity
    author: MemberEntity
    reacts: ReactEntity[]
    replyTo: MessageEntity
    replies: MessageEntity[]
}
