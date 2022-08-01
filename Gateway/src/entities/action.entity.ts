import {
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ButtonEntity } from './button.entity'
import { MessageEntity } from './message.entity'
import { ReactEntity } from './react.entity'
import { SelectEntity } from './select.entity'

@Entity()
export class ActionEntity {
    @PrimaryGeneratedColumn('uuid')
    actionId: string

    @OneToMany(() => ReactEntity, (type) => type.action, { cascade: true })
    reacts: ReactEntity[]

    @OneToMany(() => ButtonEntity, (type) => type.action, { cascade: true })
    buttons: ButtonEntity[]

    @OneToMany(() => SelectEntity, (type) => type.action, { cascade: true })
    selects: SelectEntity[]

    @OneToOne(() => MessageEntity, (type) => type.action, { cascade: true })
    @JoinColumn()
    message: MessageEntity
}
