import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChannelCategoryEntity } from "./channelCategory.entity";
import { UserEntity } from "./user.entity";
import { UserJoinGuildEntity } from "./userJoinGuild.entity";

@Entity()
export class GuildEntity {
    @PrimaryGeneratedColumn('uuid')
    guildlId: string

    @Column()
    name: string

    /** @relationship */
    @OneToMany(() => UserJoinGuildEntity, (type) => type.user)
    members: UserEntity[]

    @OneToMany(() => ChannelCategoryEntity, (type) => type.guild)
    categories: ChannelCategoryEntity[]
}