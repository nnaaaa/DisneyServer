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
var __param =
    (this && this.__param) ||
    function (paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex)
        }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthController = void 0
const common_1 = require('@nestjs/common')
const swagger_1 = require('@nestjs/swagger')
const auth_user_decorator_1 = require('../../../shared/decorators/auth-user.decorator')
const user_entity_1 = require('../../../entities/user.entity')
const auth_service_1 = require('./auth.service')
const forgetPassword_dto_1 = require('./dtos/forgetPassword.dto')
const tokenPayload_dto_1 = require('./dtos/tokenPayload.dto')
const userLogin_dto_1 = require('./dtos/userLogin.dto')
const userRegister_dto_1 = require('./dtos/userRegister.dto')
const verifyAuthUser_dto_1 = require('./dtos/verifyAuthUser.dto')
const facebook_guard_1 = require('./guards/facebook.guard')
const local_guard_1 = require('./guards/local.guard')
const refresh_guard_1 = require('./guards/refresh.guard')
const google_guard_1 = require('./guards/google.guard')
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService
    }
    async localLogin(user, res) {
        const accessToken = await this.authService.getUserAccessToken(user.userId)
        res.setHeader('accessToken', accessToken)
        const refreshToken = await this.authService.getUserRefreshToken(user.userId)
        await this.authService.storeRefreshToken(user.userId, refreshToken)
        res.setHeader('refreshToken', refreshToken)
    }
    async register(createUserDto) {
        await this.authService.createAuthUser(createUserDto)
    }
    async registerOAuth(createUserDto) {
        await this.authService.createAuthUser(createUserDto, false)
    }
    async verify(verifyAuthUserDto, res) {
        const user = await this.authService.verifyAuthUserToRegister(verifyAuthUserDto)
        const accessToken = await this.authService.getUserAccessToken(user.userId)
        res.setHeader('accessToken', accessToken)
        const refreshToken = await this.authService.getUserRefreshToken(user.userId)
        await this.authService.storeRefreshToken(user.userId, refreshToken)
        res.setHeader('refreshToken', refreshToken)
    }
    async forgetPassword(forgetPasswordDto) {
        await this.authService.createAuthChangePassword(forgetPasswordDto)
    }
    async newPassword(newPasswordDto) {
        await this.authService.verifyAuthUserToChangePassword(newPasswordDto)
    }
    async changePassword(newPasswordDto) {
        await this.authService.changeUserPassword(newPasswordDto)
    }
    async refreshToken(user, res) {
        const accessToken = await this.authService.getUserAccessToken(user.userId)
        res.setHeader('accessToken', accessToken)
    }
    async facebookLogin() {}
    async facebookLoginRedirect(req, res) {
        const { accessToken, refreshToken, profile } = req.user
        res.setHeader('accessToken', accessToken)
        return res.redirect('https://localhost:3000/EUN#/auth')
    }
    async googleLogin() {}
    async googleAuthRedirect(req, res) {
        try {
            await this.registerOAuth(req.user)
        } catch (_a) {
            console.log('Account already exists')
        } finally {
            const accessToken = await this.authService.getUserAccessToken(req.user.userId)
            const refreshToken = await this.authService.getUserRefreshToken(
                req.user.userId
            )
            return res.redirect(
                `http://localhost:3000?accessToken=${accessToken}&refreshToken=${refreshToken}`
            )
        }
    }
}
__decorate(
    [
        (0, common_1.Post)('login'),
        (0, swagger_1.ApiBody)({ required: true, type: userLogin_dto_1.UserLoginDto }),
        (0, common_1.UseGuards)(local_guard_1.LocalGuard),
        __param(0, (0, auth_user_decorator_1.AuthUser)()),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [user_entity_1.UserEntity, Object]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'localLogin',
    null
)
__decorate(
    [
        (0, common_1.Post)('register'),
        __param(0, (0, common_1.Body)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [userRegister_dto_1.UserRegisterDto]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'register',
    null
)
__decorate(
    [
        (0, common_1.Post)('register-oauth'),
        __param(0, (0, common_1.Body)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [userRegister_dto_1.UserRegisterDto]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'registerOAuth',
    null
)
__decorate(
    [
        (0, common_1.Put)('verify'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [verifyAuthUser_dto_1.VerifyAuthUserDto, Object]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'verify',
    null
)
__decorate(
    [
        (0, common_1.Post)('forgetPassword'),
        __param(0, (0, common_1.Body)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [forgetPassword_dto_1.ForgetPasswordDto]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'forgetPassword',
    null
)
__decorate(
    [
        (0, common_1.Put)('newPassword'),
        __param(0, (0, common_1.Body)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [forgetPassword_dto_1.NewPassordWithSMSDto]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'newPassword',
    null
)
__decorate(
    [
        (0, common_1.Put)('changePassword'),
        __param(0, (0, common_1.Body)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [
            forgetPassword_dto_1.NewPasswordWithComparationDto,
        ]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'changePassword',
    null
)
__decorate(
    [
        (0, common_1.Get)('refresh'),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(refresh_guard_1.RefreshTokenGuard),
        __param(0, (0, auth_user_decorator_1.AuthUser)()),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [tokenPayload_dto_1.UserTokenPayload, Object]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'refreshToken',
    null
)
__decorate(
    [
        (0, common_1.Get)('facebook'),
        (0, common_1.UseGuards)(facebook_guard_1.FacebookGuard),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'facebookLogin',
    null
)
__decorate(
    [
        (0, common_1.Get)('facebook/redirect'),
        (0, common_1.UseGuards)(facebook_guard_1.FacebookGuard),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'facebookLoginRedirect',
    null
)
__decorate(
    [
        (0, common_1.Get)('google'),
        (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'googleLogin',
    null
)
__decorate(
    [
        (0, common_1.Get)('google/redirect'),
        (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'googleAuthRedirect',
    null
)
AuthController = __decorate(
    [
        (0, swagger_1.ApiTags)('auth'),
        (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
        (0, common_1.Controller)('auth'),
        __metadata('design:paramtypes', [auth_service_1.AuthService]),
    ],
    AuthController
)
exports.AuthController = AuthController
//# sourceMappingURL=auth.controller.js.map
