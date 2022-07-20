import { GuildEntity } from './guild.entity';
import { ReactEntity } from './react.entity';
export declare class EmojiEntity {
    emojiId: string;
    imageUrl: string;
    guild: GuildEntity;
    reacts: ReactEntity[];
}
