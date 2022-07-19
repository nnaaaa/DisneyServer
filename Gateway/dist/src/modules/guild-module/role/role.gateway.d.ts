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
    create(createDto: CreateRoleDto, guild: GuildDto): Promise<any>
    update(updateRoleDto: UpdateRoleDto): Promise<any>
    delete(roleId: string): Promise<any>
    addToMember(memberRoleDto: MemberRoleDto): Promise<any>
    removeFromMember(memberRoleDto: MemberRoleDto): Promise<any>
    addToChannel(channelRoleDto: ChannelRoleDto): Promise<any>
    removeFromChannel(channelRoleDto: ChannelRoleDto): Promise<any>
}
