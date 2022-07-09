import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommandEntity } from './command.entity'

@Entity()
export class ArgumentEntity {
    @PrimaryGeneratedColumn('uuid')
    argId: string

    @Column()
    name: string

    @Column()
    value: string

    /** @relationship */
    @ManyToOne(() => CommandEntity, (type) => type.args, { onDelete: 'CASCADE' })
    command: CommandEntity
}
