import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthWSUser } from 'src/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { GuildSocketEvent } from 'src/shared/socket.event.constant'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { CreateGuildDto } from './dtos/createGuild.dto'
import { UpdateGuildDto } from './dtos/updateGuild.dto'
import { GuildService } from './guild.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'guild' })
export class GuildGateway {
  private readonly logger = new Logger(GuildGateway.name)
  @WebSocketServer()
  public readonly server: Server

  constructor(private guildService: GuildService) {}

  /** @return GuildEntity after save */
  @UseGuards(JwtWsGuard)
  @SubscribeMessage('create')
  @UsePipes(new ValidationPipe())
  async create(
    @AuthWSUser() authUser: UserEntity,
    @MessageBody() createGuildDto: CreateGuildDto
  ) {
    try {
      return await this.guildService.createTemplateGuild(
        createGuildDto,
        authUser
      )
    } catch (e) {
      this.logger.error(e)
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('update')
  @UsePipes(new ValidationPipe())
  async update(@MessageBody() updateGuildDto: UpdateGuildDto) {
    try {
      await this.guildService.updateOneGuild(
        { guildId: updateGuildDto.guildId },
        updateGuildDto
      )
      this.server.emit(
        `${GuildSocketEvent.UPDATE}/${updateGuildDto.guildId}`,
        updateGuildDto
      )
    } catch (e) {
      this.logger.error(e)
    }
  }

  /** @return GuildEntity */
  @UseGuards(JwtWsGuard)
  @SubscribeMessage('get')
  async get(@MessageBody() guildId: string) {
    try {
      const guild = await this.guildService.findOneGuild({ guildId })
      return guild
    } catch (e) {
      this.logger.error(e)
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('delete')
  async delete(@MessageBody() guildId: string) {
    try {
      await this.guildService.deleteGuild({ guildId })
      this.server.emit(`${GuildSocketEvent.DELETE}/${guildId}`)
    } catch (e) {
      this.logger.error(e)
    }
  }

  /** @return GuildEntity which user have joined */
  @UseGuards(JwtWsGuard)
  @SubscribeMessage('joinGuild')
  async joinGuild(
    @MessageBody() guildId: string,
    @AuthWSUser() authUser: UserEntity
  ) {
    try {
      const { guild, newMember } = await this.guildService.joinGuild(
        guildId,
        authUser
      )
      this.server.emit(`${GuildSocketEvent.USER_JOIN}/${guildId}`, newMember)

      return guild
    } catch (e) {
      this.logger.error(e)
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('leaveGuild')
  async leaveGuild(
    @MessageBody() guildId: string,
    @AuthWSUser() authUser: UserEntity
  ) {
    try {
      const joinGuild = await this.guildService.deleteJoinGuild({
        user: { userId: authUser.userId },
        guild: { guildId },
      })
      this.server.emit(`${GuildSocketEvent.USER_LEAVE}/${guildId}`, joinGuild)
    } catch (e) {
      this.logger.error(e)
    }
  }

  // /** @return UserJoinGuildEntity after update */
  // @UseGuards(JwtWsGuard)
  // @SubscribeMessage('updateMember')
  // async updateMember(
  //   @MessageBody() updateJoinGuildDto: UpdateGuildDto,
  //   @AuthWSUser() authUser: UserEntity
  // ) {
  //   try {
  //     const { guild, newMember } = await this.guildService.updateOneJoinGuild(
  //       {
  //         guild: { guildId: updateJoinGuildDto.guildId },
  //         user: { userId: authUser.userId },
  //       },
  //       updateJoinGuildDto
  //     )
  //     this.server.emit(
  //       `${GuildSocketEvent.USER_JOIN}/${guild.guildId}`,
  //       newMember
  //     )
  //     return guild
  //   } catch (e) {
  //     this.logger.error(e)
  //   }
  // }
}
