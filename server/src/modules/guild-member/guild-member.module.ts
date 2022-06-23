import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GuildMemberEntity } from 'src/entities/guildMember.entity'
import { GuildMemberService } from './guild-member.service'

@Module({
    imports: [TypeOrmModule.forFeature([GuildMemberEntity])],
    providers: [GuildMemberService],
    exports: [TypeOrmModule, GuildMemberService],
})
export class GuildMemberModule {}
