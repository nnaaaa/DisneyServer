import { Server } from 'socket.io'
import { UserEntity } from 'src/entities/user.entity'
import { GuildDto } from 'src/shared/dtos/guild.dto'
import { UpdateMemberDto } from './dtos/updateMember.dto'
import { MemberService } from './member.service'
export declare class MemberGateway {
    private memberService
    private readonly logger
    readonly server: Server
    constructor(memberService: MemberService)
    joinGuild(guildOfMemberDto: GuildDto, authUser: UserEntity): Promise<void>
    leaveGuild(memberId: string): Promise<void>
    updateMember(updateMemberDto: UpdateMemberDto): Promise<void>
    memberOnline(memberId: string): void
}
