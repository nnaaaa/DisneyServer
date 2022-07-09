import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ArgumentEntity } from './argument.entity'
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

    @OneToMany(() => ArgumentEntity, (type) => type.command, { cascade: true })
    args: ArgumentEntity[]
}
