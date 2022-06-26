import { Server } from 'socket.io';
import { ChannelEntity } from 'src/entities/channel.entity';
import { GuildMemberEntity } from 'src/entities/guildMember.entity';
import { ChannelSocketEmit } from 'src/shared/socket.emit';
import { ChannelCategoryService } from '../channel-category/channel-category.service';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dtos/createChannel.dto';
import { UpdateChannelDto } from './dtos/updateChannel.dto';
export declare class ChannelGateway {
    private channelService;
    private channelCtgService;
    server: Server;
    constructor(channelService: ChannelService, channelCtgService: ChannelCategoryService);
    create(createChannelDto: CreateChannelDto, categoryId: string): Promise<void>;
    update(updateChannelDto: UpdateChannelDto): Promise<void>;
    delete(channelId: string): Promise<void>;
    channelMemberNotify(event: ChannelSocketEmit, member: GuildMemberEntity): void;
    updateNotify(channel: ChannelEntity): void;
}
