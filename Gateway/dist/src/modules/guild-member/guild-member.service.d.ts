import { GuildEntity } from 'src/entities/guild.entity'
import { GuildMemberEntity } from 'src/entities/guildMember.entity'
import { UserEntity } from 'src/entities/user.entity'
import { GuildMemberRepository } from 'src/repositories/userJoinGuild.repository'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
export declare class GuildMemberService {
    private userJoinGuildRepository
    readonly guildMemberRelations: FindOptionsRelations<GuildMemberEntity>
    constructor(userJoinGuildRepository: GuildMemberRepository)
    save(joinGuild: GuildMemberEntity): Promise<GuildMemberEntity>
    create(guild: GuildEntity, user: UserEntity): Promise<GuildMemberEntity>
    findOneWithRelation(
        findCondition: FindOptionsWhere<GuildMemberEntity>
    ): Promise<GuildMemberEntity>
    findManyWithRelation(
        findCondition: FindOptionsWhere<GuildMemberEntity>
    ): Promise<GuildMemberEntity[]>
    updateOne(
        findCondition: FindOptionsWhere<GuildMemberEntity>,
        updateCondition: QueryDeepPartialEntity<GuildMemberEntity>
    ): Promise<GuildMemberEntity>
    delete(findCondition: FindOptionsWhere<GuildMemberEntity>): Promise<GuildMemberEntity>
}
