import { MemberEntity } from 'src/entities/member.entity'
import { UserEntity } from 'src/entities/user.entity'
import { MemberRepository } from 'src/repositories/userJoinGuild.repository'
import { GuildDto } from 'src/shared/dtos/guild.dto'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { MessageService } from '../message/message.service'
import { ReactService } from '../react/react.service'
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
    create(guildOfMember: GuildDto, user: UserEntity): Promise<MemberEntity>
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
}
