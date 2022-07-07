'use strict'
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v)
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthService = void 0
const common_1 = require('@nestjs/common')
const jwt_1 = require('@nestjs/jwt')
const algorithms_1 = require('../../shared/algorithms')
const mail_service_1 = require('../mail/mail.service')
const user_service_1 = require('../user/user.service')
let AuthService = class AuthService {
    constructor(jwtService, userService, mailService) {
        this.jwtService = jwtService
        this.userService = userService
        this.mailService = mailService
    }
    verifyToken(token) {
        return this.jwtService.verify(token)
    }
    async getAccessToken(userId) {
        return this.jwtService.sign({ userId }, { expiresIn: '1d' })
    }
    async getRefreshToken(userId) {
        return this.jwtService.sign({ userId }, { expiresIn: '30d' })
    }
    async createAuthUser(userRegisterDto, withVerify = true) {
        const user = await this.userService.findOne({
            account: userRegisterDto.account,
        })
        if (user) throw new common_1.ForbiddenException()
        if (withVerify) {
            const digitCode = algorithms_1.Algorithm.generateDigit(6)
            this.mailService.registerConfirm(userRegisterDto, digitCode)
            await this.userService.create(userRegisterDto, digitCode)
        } else {
            await this.userService.create(userRegisterDto)
        }
    }
    async createAuthChangePassword({ account }) {
        const digitCode = algorithms_1.Algorithm.generateDigit(6)
        const user = await this.userService.findOne(
            { account },
            {
                userId: true,
                account: true,
                registerVerifyCode: true,
                changePwdVerfiyCode: true,
            }
        )
        if (!user) throw new common_1.NotFoundException()
        if (user.registerVerifyCode) throw new common_1.UnauthorizedException()
        user.changePwdVerfiyCode = digitCode
        await this.userService.save(user)
        await this.mailService.changePasswordConfirm(account, digitCode)
    }
    async verifyAuthUserToChangePassword(newPassordWithSMSDto) {
        const { digitCode, account } = newPassordWithSMSDto
        if (!digitCode) throw new common_1.ForbiddenException()
        const user = await this.userService.findOne(
            { account },
            { userId: true, password: true, changePwdVerfiyCode: true }
        )
        if (!user) throw new common_1.NotFoundException()
        if (user.changePwdVerfiyCode && user.changePwdVerfiyCode === digitCode)
            await this.userService.changePassword(newPassordWithSMSDto, user)
    }
    async verifyAuthUserToRegister({ account, digitCode }) {
        const user = await this.userService.findOne(
            { account },
            { userId: true, registerVerifyCode: true }
        )
        if (!user) throw new common_1.NotFoundException()
        if (!user.registerVerifyCode) throw new common_1.ForbiddenException()
        if (user.registerVerifyCode !== digitCode)
            throw new common_1.UnauthorizedException()
        await this.userService.updateOne({ account }, { registerVerifyCode: null })
        return user
    }
    async changeUserPassword(newPassordWithComparation) {
        const { account } = newPassordWithComparation
        const user = await this.userService.findOne(
            { account },
            { userId: true, password: true, registerVerifyCode: true }
        )
        if (!user) throw new common_1.NotFoundException()
        if (user.registerVerifyCode) throw new common_1.UnauthorizedException()
        await this.userService.changePassword(newPassordWithComparation, user)
    }
    async storeRefreshToken(userId, refreshToken) {
        await this.userService.updateOne({ userId }, { refreshToken })
    }
}
AuthService = __decorate(
    [
        (0, common_1.Injectable)(),
        __metadata('design:paramtypes', [
            jwt_1.JwtService,
            user_service_1.UserService,
            mail_service_1.MailService,
        ]),
    ],
    AuthService
)
exports.AuthService = AuthService
//# sourceMappingURL=auth.service.js.map
