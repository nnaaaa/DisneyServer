import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Algorithm } from 'src/shared/algorithms'
import { MailService } from '../mail/mail.service'
import { UserService } from '../user/user.service'
import { UserRegisterDto } from './dtos/userRegister.dto'
import { VerifyAuthUserDto } from './dtos/verifyAuthUser.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService
  ) {}

  async getAccessToken(userId: string) {
    return this.jwtService.sign({ userId }, { expiresIn: '1d' })
  }
  async getRefreshToken(userId: string) {
    return this.jwtService.sign({ userId }, { expiresIn: '30d' })
  }

  async createAuthUser(userRegisterDto: UserRegisterDto) {
    const user = await this.userService.findOne({
      account: userRegisterDto.account,
    })
    if (user) throw new ForbiddenException()

    const digitCode = Algorithm.generateSMS(6)

    await this.userService.create(userRegisterDto, digitCode)

    await this.mailService.registerConfirm(userRegisterDto, digitCode)

    return digitCode
  }

  async verifyAuthUser(verifyAuthUserDto: VerifyAuthUserDto) {
    const { account, digitCode } = verifyAuthUserDto

    const user = await this.userService.findOne({ account })

    if (!user) throw new ForbiddenException()

    if (user.verifyCode !== digitCode)
      throw new NotFoundException()

    await this.userService.updateOne({ account }, { isVerify: true })
    
    return user
  }

  async storeRefreshToken(userId: string, refreshToken: string) {
    await this.userService.updateOne({ userId }, { refreshToken })
  }
}
