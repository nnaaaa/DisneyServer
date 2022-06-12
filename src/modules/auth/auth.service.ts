import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Algorithm } from 'src/shared/algorithms'
import { MailService } from '../mail/mail.service'
import { UserService } from '../user/user.service'
import {
  ForgetPasswordDto,
  NewPassordWithSMSDto,
  NewPasswordWithComparationDto,
} from './dtos/forgetPassword.dto'
import { UserRegisterDto } from './dtos/userRegister.dto'
import { VerifyAuthUserDto } from './dtos/verifyAuthUser.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService
  ) {}

  verifyToken(token: string) {
    return this.jwtService.verify(token)
  }

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

    // await this.mailService.registerConfirm(userRegisterDto, digitCode)
  }

  async createAuthChangePassword({ account }: ForgetPasswordDto) {
    const digitCode = Algorithm.generateSMS(6)

    await this.userService.updateOne(
      { account },
      { changePwdVerfiyCode: digitCode }
    )

    await this.mailService.changePasswordConfirm(account, digitCode)
  }

  async verifyAuthUserToChangePassword(
    newPassordWithSMSDto: NewPassordWithSMSDto
  ) {
    const { digitCode, account } = newPassordWithSMSDto

    if (!digitCode) throw new ForbiddenException()

    const user = await this.userService.findOne({ account })

    if (!user) throw new NotFoundException()

    if (user.changePwdVerfiyCode && user.changePwdVerfiyCode === digitCode)
      await this.userService.changePassword(newPassordWithSMSDto, user)
  }

  async verifyAuthUserToRegister({ account, digitCode }: VerifyAuthUserDto) {
    const user = await this.userService.findOne({ account })

    if (!user) throw new NotFoundException()

    if (!user.registerVerifyCode) throw new ForbiddenException()

    if (user.registerVerifyCode !== digitCode) throw new UnauthorizedException()

    await this.userService.updateOne({ account }, { registerVerifyCode: null })

    return user
  }

  async changeUserPassword(
    newPassordWithComparation: NewPasswordWithComparationDto
  ) {
    const { account } = newPassordWithComparation

    const user = await this.userService.findOne({ account })

    if (!user) throw new NotFoundException()
    await this.userService.changePassword(newPassordWithComparation, user)
  }

  async storeRefreshToken(userId: string, refreshToken: string) {
    await this.userService.updateOne({ userId }, { refreshToken })
  }
}
