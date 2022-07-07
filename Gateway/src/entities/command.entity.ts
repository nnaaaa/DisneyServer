import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BotEntity } from './bot.entity'

@Entity()
export class CommandEntity {
    @PrimaryGeneratedColumn('uuid')
    commandId: string

    @Column()
    name: string

    @Column({ type: 'longtext' })
    description: string

    /** @relationship */
    @ManyToOne(() => BotEntity, (type) => type.commands, { onDelete: 'CASCADE' })
    bot: BotEntity
}
