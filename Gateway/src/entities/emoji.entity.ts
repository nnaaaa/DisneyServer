import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { GuildEntity } from './guild.entity'
import { ReactEntity } from './react.entity'

@Entity()
export class EmojiEntity {
    @PrimaryGeneratedColumn('uuid')
    emojiId: string

    @Column()
    imageUrl: string

    @Column()
    name: string

    @ManyToOne(() => GuildEntity, (type) => type.emojis)
    guild: GuildEntity

    @OneToMany(() => ReactEntity, (react) => react.emoji, { cascade: true })
    reacts: ReactEntity[]
}
