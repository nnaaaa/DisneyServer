import { Server } from 'socket.io'
import { GuildDto } from 'src/shared/dtos'
import { ChannelCategoryService } from './channel-category.service'
import { CreateChannelCtgDto } from './dtos/createChannelCtg.dto'
import { UpdateChannelCtgDto } from './dtos/updateChannelCtg.dto'
export declare class ChannelCategoryGateway {
    private channelCtgService
    private readonly logger
    server: Server
    constructor(channelCtgService: ChannelCategoryService)
    create(createChannelCtgDto: CreateChannelCtgDto, guild: GuildDto): Promise<void>
    update(updateChannelCtgDto: UpdateChannelCtgDto): Promise<void>
    delete(categoryId: string): Promise<void>
}
