import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ButtonEntity } from './button.entity'
import { MessageEntity } from './message.entity'
import { ReactEntity } from './react.entity'

@Entity()
export class ActionEntity {
    @PrimaryGeneratedColumn('uuid')
    actionId: string

    @OneToMany(() => ReactEntity, (type) => type.action, { cascade: true })
    reacts: ReactEntity[]

    @OneToMany(() => ButtonEntity, (type) => type.action, { cascade: true })
    buttons: ButtonEntity[]

    @OneToOne(() => MessageEntity, (type) => type.action, { cascade: true })
    message: MessageEntity
}
