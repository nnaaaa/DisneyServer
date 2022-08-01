import { GuildEntity } from 'src/entities/guild.entity'
import { MemberEntity } from 'src/entities/member.entity'
import { Repository } from 'typeorm'

export class MemberRepository extends Repository<MemberEntity> {}
