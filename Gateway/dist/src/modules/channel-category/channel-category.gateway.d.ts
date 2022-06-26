import { Server } from 'socket.io';
import { ChannelService } from '../channel/channel.service';
import { GuildService } from '../guild/guild.service';
import { ChannelCategoryService } from './channel-category.service';
import { CreateChannelCtgDto } from './dtos/createChannelCtg.dto';
import { UpdateChannelCtgDto } from './dtos/updateChannelCtg.dto';
export declare class ChannelCategoryGateway {
    private channelService;
    private channelCtgService;
    private guildService;
    server: Server;
    constructor(channelService: ChannelService, channelCtgService: ChannelCategoryService, guildService: GuildService);
    create(createChannelCtgDto: CreateChannelCtgDto, guildId: string): Promise<void>;
    update(updateChannelCtgDto: UpdateChannelCtgDto): Promise<void>;
    delete(categoryId: string): Promise<void>;
}
