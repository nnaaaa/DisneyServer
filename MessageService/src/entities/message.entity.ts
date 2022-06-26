import { Column, Entity, ObjectIdColumn } from 'typeorm'


@Entity()
export class MessageEntity {
    @ObjectIdColumn()
    messageId: string

    @Column()
    name: string

    // /** @relationship */
    // @ManyToOne(() => GuildEntity, (type) => type.categories)
    // guild: GuildEntity

    // @OneToMany(() => ChannelEntity, (type) => type.category, { cascade: true })
    // channels: ChannelEntity[]
}

