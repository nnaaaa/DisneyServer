import { Server } from 'socket.io';
import { UserEntity } from 'src/entities/user.entity';
import { MemberService } from '../member/member.service';
import { CreateGuildDto } from './dtos/createGuild.dto';
import { UpdateGuildDto } from './dtos/updateGuild.dto';
import { GuildService } from './guild.service';
export declare class GuildGateway {
    private guildService;
    private memberService;
    private readonly logger;
    readonly server: Server;
    constructor(guildService: GuildService, memberService: MemberService);
    create(authUser: UserEntity, createGuildDto: CreateGuildDto): Promise<any>;
    update(updateGuildDto: UpdateGuildDto): Promise<any>;
    getOne(guildId: string, authUser: UserEntity): Promise<any>;
    getOfMe({ userId }: UserEntity): Promise<any>;
    delete(guildId: string): Promise<any>;
}
