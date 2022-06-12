import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GuildEntity } from 'src/entities/guild.entity'
import { UserJoinGuildEntity } from 'src/entities/userJoinGuild.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GuildEntity, UserJoinGuildEntity])],
  exports: [TypeOrmModule],
})
export class GuildModule {}
