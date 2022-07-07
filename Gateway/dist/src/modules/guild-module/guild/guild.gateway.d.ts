import { Server } from 'socket.io'
import { UserEntity } from 'src/entities/user.entity'
import { MemberService } from '../member/member.service'
import { CreateGuildDto } from './dtos/createGuild.dto'
import { UpdateGuildDto } from './dtos/updateGuild.dto'
import { GuildService } from './guild.service'
export declare class GuildGateway {
    private guildService
    private memberService
    private readonly logger
    readonly server: Server
    constructor(guildService: GuildService, memberService: MemberService)
    create(
        authUser: UserEntity,
        createGuildDto: CreateGuildDto
    ): Promise<import('../../../entities/guild.entity').GuildEntity>
    update(updateGuildDto: UpdateGuildDto): Promise<void>
    getOne(
        guildId: string,
        authUser: UserEntity
    ): Promise<{
        guild: import('../../../entities/guild.entity').GuildEntity
        member: import('../../../entities/member.entity').MemberEntity
    }>
    getOfMe({
        userId,
    }: UserEntity): Promise<import('../../../entities/guild.entity').GuildEntity[]>
    delete(guildId: string): Promise<void>
}
