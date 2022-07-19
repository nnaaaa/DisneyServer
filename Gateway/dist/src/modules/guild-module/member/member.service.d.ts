import { MemberEntity } from 'src/entities/member.entity'
import { UserEntity } from 'src/entities/user.entity'
import { MemberRepository } from 'src/repositories/userJoinGuild.repository'
import { BotDto } from 'src/shared/dtos/bot.dto'
import { GuildDto } from 'src/shared/dtos/guild.dto'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { MessageService } from '../../message-module/message/message.service'
import { ReactService } from '../../message-module/react/react.service'
export declare class MemberService {
    private memberRepository
    private messageService
    private reactService
    readonly guildMemberRelations: FindOptionsRelations<MemberEntity>
    constructor(
        memberRepository: MemberRepository,
        messageService: MessageService,
        reactService: ReactService
    )
    save(joinGuild: MemberEntity): Promise<MemberEntity>
    createByUser(guildOfMember: GuildDto, user: UserEntity): Promise<MemberEntity>
    createByBot(guildOfMember: GuildDto, bot: BotDto): Promise<MemberEntity>
    findOneWithRelation(
        findCondition: FindOptionsWhere<MemberEntity>
    ): Promise<MemberEntity>
    findManyWithRelation(
        findCondition: FindOptionsWhere<MemberEntity>
    ): Promise<MemberEntity[]>
    updateOne(
        findCondition: FindOptionsWhere<MemberEntity>,
        updateCondition: QueryDeepPartialEntity<MemberEntity>
    ): Promise<MemberEntity>
    deleteMany(findCondition: FindOptionsWhere<MemberEntity>): Promise<void>
    deleteOne(findCondition: FindOptionsWhere<MemberEntity>): Promise<MemberEntity>
    botJoin(guildOfMemberDto: GuildDto, botDto: BotDto): Promise<MemberEntity>
    userJoin(guildOfMemberDto: GuildDto, userDto: UserEntity): Promise<MemberEntity>
}
