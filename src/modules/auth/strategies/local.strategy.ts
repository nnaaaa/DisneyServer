import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import * as Bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private useService: UserService) {
    super({ usernameField: 'account' })
  }

  async validate(account: string, password: string) {
    const user = await this.useService.findOne(
      { account },
      { userId: true, account: true, password: true, registerVerifyCode: true }
    )
    if (!user) throw new NotFoundException()

    const isMatch = await Bcrypt.compare(password, user.password)
    if (!isMatch) throw new UnauthorizedException()

    if (user.registerVerifyCode) throw new UnauthorizedException()

    return user
  }
}
