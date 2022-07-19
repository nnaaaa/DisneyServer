import { RoleEntity } from 'src/entities/role.entity'
import { RoleRepository } from 'src/repositories/role.repository'
import { GuildDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ChannelService } from '../channel/channel.service'
import { MemberService } from '../member/member.service'
import { ChannelRoleDto } from './dtos/channelRole.dto'
import { CreateRoleDto } from './dtos/createRole.dto'
import { MemberRoleDto } from './dtos/memberRole.dto'
export declare class RoleService {
    private roleRepository
    private channelService
    private memberService
    readonly roleRelations: FindOptionsRelations<RoleEntity>
    constructor(
        roleRepository: RoleRepository,
        channelService: ChannelService,
        memberService: MemberService
    )
    save(role: RoleEntity): Promise<RoleEntity>
    create(createDto: CreateRoleDto, guild: GuildDto): Promise<RoleEntity>
    findOneWithRelation(findCondition: FindOptionsWhere<RoleEntity>): Promise<RoleEntity>
    findManyWithReletion(
        findCondition: FindOptionsWhere<RoleEntity>
    ): Promise<RoleEntity[]>
    update(
        findCondition: FindOptionsWhere<RoleEntity>,
        updateCondition: QueryDeepPartialEntity<RoleEntity>
    ): Promise<void>
    deleteMany(findCondition: FindOptionsWhere<RoleEntity>): Promise<void>
    deleteOne(findCondition: FindOptionsWhere<RoleEntity>): Promise<RoleEntity>
    addToMember({ roleId, memberId }: MemberRoleDto): Promise<{
        role: RoleEntity
        member: import('../../../entities/member.entity').MemberEntity
    }>
    removeFromMember({ roleId, memberId }: MemberRoleDto): Promise<{
        role: RoleEntity
        member: import('../../../entities/member.entity').MemberEntity
    }>
    addToChannel({ roleId, channelId }: ChannelRoleDto): Promise<{
        role: RoleEntity
        channel: import('../../../entities/channel.entity').ChannelEntity
    }>
    removeFromChannel({ roleId, channelId }: ChannelRoleDto): Promise<{
        role: RoleEntity
        channel: import('../../../entities/channel.entity').ChannelEntity
    }>
}
