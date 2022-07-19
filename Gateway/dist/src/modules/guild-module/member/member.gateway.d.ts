import { Server } from 'socket.io'
import { UserEntity } from 'src/entities/user.entity'
import { BotDto } from 'src/shared/dtos/bot.dto'
import { GuildDto } from 'src/shared/dtos/guild.dto'
import { UpdateMemberDto } from './dtos/updateMember.dto'
import { MemberService } from './member.service'
export declare class MemberGateway {
    private memberService
    private readonly logger
    readonly server: Server
    constructor(memberService: MemberService)
    getOfMe({
        userId,
    }: UserEntity): Promise<import('../../../entities/member.entity').MemberEntity[]>
    botJoinGuild(guildOfMemberDto: GuildDto, botDto: BotDto): Promise<any>
    userJoinGuild(guildOfMemberDto: GuildDto, authUser: UserEntity): Promise<any>
    leaveGuild(memberId: string): Promise<any>
    updateMember(updateMemberDto: UpdateMemberDto): Promise<void>
    memberOnline(memberId: string): void
}
