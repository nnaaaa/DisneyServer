import { ChannelEntity } from './channel.entity';
import { GuildEntity } from './guild.entity';
export declare class ChannelCategoryEntity {
    categoryId: string;
    name: string;
    guild: GuildEntity;
    channels: ChannelEntity[];
}
