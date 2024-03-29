import { MemberEntity } from './member.entity'
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ActionEntity } from './action.entity'

export enum ButtonStyle {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

@Entity()
export class ButtonEntity {
    @PrimaryGeneratedColumn('uuid')
    buttonId: string

    @Column({ default: '' })
    customId: string

    @Column()
    name: string

    @Column({ type: 'bool', default: false })
    isDisabled: boolean

    @Column({ type: 'enum', enum: ButtonStyle, default: ButtonStyle.PRIMARY })
    style: ButtonStyle

    @ManyToOne(() => ActionEntity, (react) => react.buttons)
    action: ActionEntity
}
