import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SelectEntity } from "./select.entity"

@Entity()
export class OptionEntity{
    @PrimaryGeneratedColumn('uuid')
    optionId: string

    @Column()
    value: string

    @Column({ default:'' })
    description: string

    @ManyToOne(() => SelectEntity, type => type.options)
    select: SelectEntity
}