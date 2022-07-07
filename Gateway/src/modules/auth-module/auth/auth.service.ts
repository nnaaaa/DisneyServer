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

    async getBotAccessToken(botId: string) {
        return this.jwtService.sign({ botId })
    }

    async getUserAccessToken(userId: string) {
        return this.jwtService.sign({ userId }, { expiresIn: '1d' })
    }

    async getUserRefreshToken(userId: string) {
        return this.jwtService.sign({ userId }, { expiresIn: '30d' })
    }

    async createAuthUser(userRegisterDto: UserRegisterDto, withVerify = true) {
        const user = await this.userService.findOne({
            account: userRegisterDto.account,
        })
        if (user) throw new ForbiddenException()

        if (withVerify) {
            const digitCode = Algorithm.generateDigit(6)

            this.mailService.registerConfirm(userRegisterDto, digitCode)

            await this.userService.create(userRegisterDto, digitCode)
        } else {
            await this.userService.create(userRegisterDto)
        }
    }

    async createAuthChangePassword({ account }: ForgetPasswordDto) {
        const digitCode = Algorithm.generateDigit(6)

        const user = await this.userService.findOne(
            { account },
            {
                userId: true,
                account: true,
                registerVerifyCode: true,
                changePwdVerfiyCode: true,
            }
        )

        if (!user) throw new NotFoundException()

        if (user.registerVerifyCode) throw new UnauthorizedException()

        user.changePwdVerfiyCode = digitCode
        await this.userService.save(user)

        await this.mailService.changePasswordConfirm(account, digitCode)
    }

    async verifyAuthUserToChangePassword(newPassordWithSMSDto: NewPassordWithSMSDto) {
        const { digitCode, account } = newPassordWithSMSDto

        if (!digitCode) throw new ForbiddenException()

        const user = await this.userService.findOne(
            { account },
            { userId: true, password: true, changePwdVerfiyCode: true }
        )

        if (!user) throw new NotFoundException()

        if (user.changePwdVerfiyCode && user.changePwdVerfiyCode === digitCode)
            await this.userService.changePassword(newPassordWithSMSDto, user)
    }

    async verifyAuthUserToRegister({ account, digitCode }: VerifyAuthUserDto) {
        const user = await this.userService.findOne(
            { account },
            { userId: true, registerVerifyCode: true }
        )

        if (!user) throw new NotFoundException()

        if (!user.registerVerifyCode) throw new ForbiddenException()

        if (user.registerVerifyCode !== digitCode) throw new UnauthorizedException()

        await this.userService.updateOne({ account }, { registerVerifyCode: null })

        return user
    }

    async changeUserPassword(newPassordWithComparation: NewPasswordWithComparationDto) {
        const { account } = newPassordWithComparation

        const user = await this.userService.findOne(
            { account },
            { userId: true, password: true, registerVerifyCode: true }
        )

        if (!user) throw new NotFoundException()

        if (user.registerVerifyCode) throw new UnauthorizedException()

        await this.userService.changePassword(newPassordWithComparation, user)
    }

    async storeRefreshToken(userId: string, refreshToken: string) {
        await this.userService.updateOne({ userId }, { refreshToken })
    }
}
