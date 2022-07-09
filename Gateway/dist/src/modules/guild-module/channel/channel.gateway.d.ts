import { Server } from 'socket.io'
import { MemberDto } from 'src/shared/dtos'
import { ChannelCategoryDto } from '../../../shared/dtos/channel-category.dto'
import { ChannelService } from './channel.service'
import { CreateChannelDto } from './dtos/createChannel.dto'
import { MemberChannelDto } from './dtos/memberChannel.dto'
import { UpdateChannelDto } from './dtos/updateChannel.dto'
export declare class ChannelGateway {
    private channelService
    private readonly logger
    server: Server
    constructor(channelService: ChannelService)
    create(
        createChannelDto: CreateChannelDto,
        categoryDto: ChannelCategoryDto,
        firstMemberDto: MemberDto
    ): Promise<any>
    update(updateChannelDto: UpdateChannelDto): Promise<any>
    delete(channelId: string): Promise<any>
    addMember(memberChannelDto: MemberChannelDto): Promise<any>
    removeMember(memberChannelDto: MemberChannelDto): Promise<any>
}
