import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ActionEntity } from './action.entity'
import { OptionEntity } from './option.entity'

export enum SelectStyle {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

@Entity()
export class SelectEntity {
    @PrimaryGeneratedColumn('uuid')
    selectId: string

    @Column({ type: 'bool', default: false })
    isDisabled: boolean

    @Column({ default: '' })
    customId: string

    @Column({ type: 'enum', enum: SelectStyle, default: SelectStyle.PRIMARY })
    style: SelectStyle

    @ManyToOne(() => ActionEntity, (type) => type.selects)
    action: ActionEntity

    @OneToMany(() => OptionEntity, (type) => type.select, { cascade: true })
    options: OptionEntity[]
}
