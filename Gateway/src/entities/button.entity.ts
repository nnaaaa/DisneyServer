import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ActionEntity } from './action.entity'

@Entity()
export class ButtonEntity {
    @PrimaryGeneratedColumn('uuid')
    buttonId: string

    @Column()
    customId: string

    @Column()
    name: string

    @ManyToOne(() => ActionEntity, (react) => react.buttons)
    action: ActionEntity
}
