import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserEntity } from 'src/entities/user.entity'
import { JwtUserGuard } from 'src/modules/auth-module/auth/guards/jwtUser.guard'
import { AuthUser } from 'src/shared/decorators/auth-user.decorator'
import { MemberService } from '../member/member.service'

@Controller('guild')
export class GuildController {
    constructor(private memberService: MemberService) {}

    // /** @return MemberEntity[] */
    // @Get('/getJoined')
    // @UseGuards(JwtUserGuard)
    // async getOfMe(@AuthUser() { userId }: UserEntity) {
    //     const joinedGuilds = await this.memberService.findManyWithRelation({
    //         user: { userId },
    //     })
    //     return joinedGuilds
    // }
}
