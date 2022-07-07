import { Server } from 'socket.io'
import { GuildDto } from 'src/shared/dtos'
import { ChannelRoleDto } from './dtos/channelRole.dto'
import { CreateRoleDto } from './dtos/createRole.dto'
import { MemberRoleDto } from './dtos/memberRole.dto'
import { UpdateRoleDto } from './dtos/updateRole.dto'
import { RoleService } from './role.service'
export declare class RoleGateway {
    private roleService
    private readonly logger
    server: Server
    constructor(roleService: RoleService)
    create(createDto: CreateRoleDto, guild: GuildDto): Promise<void>
    update(updateRoleDto: UpdateRoleDto): Promise<void>
    delete(roleId: string): Promise<void>
    addToMember(memberRoleDto: MemberRoleDto): Promise<void>
    removeFromMember(memberRoleDto: MemberRoleDto): Promise<void>
    addToChannel(channelRoleDto: ChannelRoleDto): Promise<void>
    removeFromChannel(channelRoleDto: ChannelRoleDto): Promise<void>
}
