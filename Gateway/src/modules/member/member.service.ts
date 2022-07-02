import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberEntity } from 'src/entities/member.entity'
import { UserEntity } from 'src/entities/user.entity'
import { MemberRepository } from 'src/repositories/userJoinGuild.repository'
import { GuildDto } from 'src/shared/dtos/guild.dto'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { MessageService } from '../message/message.service'
import { ReactService } from '../react/react.service'

@Injectable()
export class MemberService {
    public readonly guildMemberRelations: FindOptionsRelations<MemberEntity> = {
        user: true,
        roles: true,
        joinedChannels: true,
        // sentMessages: true,
        // sentReacts: true,
        guild: true,
    }
    constructor(
        @InjectRepository(MemberEntity)
        private memberRepository: MemberRepository,
        private messageService: MessageService,
        private reactService: ReactService
    ) { }

    async save(joinGuild: MemberEntity) {
        return await this.memberRepository.save(joinGuild)
    }
    async create(guildOfMember: GuildDto, user: UserEntity) {
        const joinGuild = this.memberRepository.create({
            guild: guildOfMember,
            user,
            roles: [],
            joinedChannels: [],
        })

        joinGuild.nickname = user.name
        joinGuild.avatarUrl = user.avatarUrl

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
                await this.messageService.deleteMany({ author: {memberId:member.memberId } })
                await this.reactService.deleteMany({ author: {memberId:member.memberId } })
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
                
                await this.messageService.deleteMany({ author: {memberId:member.memberId } })
                await this.reactService.deleteMany({ author: {memberId:member.memberId } })

                await this.memberRepository.remove(member)
            }

            return member
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
