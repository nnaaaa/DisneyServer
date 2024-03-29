import {
    ConflictException,
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BotEntity } from 'src/entities/bot.entity'
import { ButtonEntity } from 'src/entities/button.entity'
import { GuildEntity } from 'src/entities/guild.entity'
import { MemberEntity } from 'src/entities/member.entity'
import { OptionEntity } from 'src/entities/option.entity'
import { UserEntity } from 'src/entities/user.entity'
import { MemberRepository } from 'src/repositories/userJoinGuild.repository'
import { BotDto } from 'src/shared/dtos/bot.dto'
import { GuildDto } from 'src/shared/dtos/guild.dto'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { MessageService } from '../../message-module/message/message.service'
import { ReactService } from '../../message-module/react/react.service'
import { GuildService } from '../guild/guild.service'
import { RoleService } from '../role/role.service'
@Injectable()
export class MemberService {
    public readonly guildMemberRelations: FindOptionsRelations<MemberEntity> = {
        user: true,
        roles: true,
        joinedChannels: true,
        // sentMessages: true,
        // sentReacts: true,
        bot: true,
        guild: true,
    }
    constructor(
        @InjectRepository(MemberEntity)
        private memberRepository: MemberRepository,
        private messageService: MessageService,
        private reactService: ReactService
    ) {}

    async save(joinGuild: MemberEntity) {
        return await this.memberRepository.save(joinGuild)
    }
    async createByUser(guildOfMember: GuildDto, user: UserEntity) {
        const joinGuild = this.memberRepository.create({
            guild: guildOfMember,
            roles: [],
            joinedChannels: [],
        })

        joinGuild.nickname = user.name
        joinGuild.avatarUrl = user.avatarUrl

        joinGuild.user = user as UserEntity

        return joinGuild
    }

    async createByBot(guildOfMember: GuildDto, bot: BotDto) {
        const joinGuild = this.memberRepository.create({
            guild: guildOfMember,
            roles: [],
            joinedChannels: [],
        })

        joinGuild.nickname = bot.name
        joinGuild.avatarUrl = bot.avatarUrl

        joinGuild.bot = bot as BotEntity

        return joinGuild
    }

    async findOneWithRelation(findCondition: FindOptionsWhere<MemberEntity>) {
        return await this.memberRepository.findOne({
            relations: this.guildMemberRelations,
            where: findCondition,
        })
    }

    async findManyWithRelation(findCondition: FindOptionsWhere<MemberEntity>) {
        return await this.memberRepository.find({
            relations: this.guildMemberRelations,
            where: findCondition,
        })
    }

    async findByUserAndButton(user: UserEntity, button: ButtonEntity) {
        const member = await this.memberRepository
            .createQueryBuilder('member')
            .leftJoinAndSelect('member.guild', 'guild')
            .leftJoinAndSelect('member.user', 'user')
            .where((qb) => {
                const guildId = qb
                    .subQuery()
                    .select('guild.guildId')
                    .from(GuildEntity, 'guild')
                    .leftJoin('guild.members', 'member')
                    .leftJoin('member.sentMessages', 'message')
                    .leftJoin('message.action', 'action')
                    .leftJoin('action.buttons', 'buttons')
                    .where('buttons.buttonId = :buttonId')
                    .getQuery()
                return 'guild.guildId IN ' + guildId
            })
            .andWhere('user.userId = :userId', { userId: user.userId })
            .setParameter('buttonId', button.buttonId)
            .getOne()

        return member
    }

    async findByUserAndSelect(user: UserEntity, option: OptionEntity) {
        const member = await this.memberRepository
            .createQueryBuilder('member')
            .leftJoinAndSelect('member.guild', 'guild')
            .leftJoinAndSelect('member.user', 'user')
            .where((qb) => {
                const guildId = qb
                    .subQuery()
                    .select('guild.guildId')
                    .from(GuildEntity, 'guild')
                    .leftJoin('guild.members', 'member')
                    .leftJoin('member.sentMessages', 'message')
                    .leftJoin('message.action', 'action')
                    .leftJoin('action.selects', 'select')
                    .leftJoin('select.options', 'option')
                    .where('option.optionId = :optionId')
                    .getQuery()
                return 'guild.guildId IN ' + guildId
            })
            .andWhere('user.userId = :userId', { userId: user.userId })
            .setParameter('optionId', option.optionId)
            .getOne()

        return member
    }

    async updateOne(
        findCondition: FindOptionsWhere<MemberEntity>,
        updateCondition: QueryDeepPartialEntity<MemberEntity>
    ) {
        try {
            let joinGuild = await this.findOneWithRelation(findCondition)

            joinGuild = Object.assign(joinGuild, updateCondition)

            return this.save(joinGuild)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
    async deleteMany(findCondition: FindOptionsWhere<MemberEntity>) {
        try {
            const members = await this.findManyWithRelation(findCondition)

            for (const member of members) {
                await this.messageService.deleteMany({
                    author: { memberId: member.memberId },
                })
                await this.reactService.deleteMany({
                    author: { memberId: member.memberId },
                })
            }

            await this.memberRepository.remove(members)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<MemberEntity>) {
        try {
            const member = await this.findOneWithRelation(findCondition)

            if (member) {
                await this.messageService.deleteMany({
                    author: { memberId: member.memberId },
                })
                await this.reactService.deleteMany({
                    author: { memberId: member.memberId },
                })

                await this.memberRepository.remove(member)
            }

            return member
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async botJoin(guildOfMemberDto: GuildDto, botDto: BotDto) {
        const isJoined = await this.findOneWithRelation({
            guild: guildOfMemberDto,
            bot: { botId: botDto.botId },
        })

        if (isJoined) throw new ConflictException('Bot is already joined')

        const newMember = await this.createByBot(guildOfMemberDto, botDto)

        const savedMember = await this.save(newMember)

        return savedMember
    }

    async userJoin(guildOfMemberDto: GuildDto, userDto: UserEntity) {
        const isJoined = await this.findOneWithRelation({
            guild: guildOfMemberDto,
            user: { userId: userDto.userId },
        })

        if (isJoined) throw new ConflictException('User is already joined')

        const newMember = await this.createByUser(guildOfMemberDto, userDto)

        const savedMember = await this.save(newMember)

        return savedMember
    }
}
