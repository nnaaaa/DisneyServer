import {
    Body,
    CacheInterceptor,
    Controller,
    Get,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthUser } from 'src/shared/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { AuthService } from './auth.service'
import {
    ForgetPasswordDto,
    NewPassordWithSMSDto,
    NewPasswordWithComparationDto,
} from './dtos/forgetPassword.dto'
import { UserTokenPayload } from './dtos/tokenPayload.dto'
import { UserLoginDto } from './dtos/userLogin.dto'
import { UserRegisterDto } from './dtos/userRegister.dto'
import { VerifyAuthUserDto } from './dtos/verifyAuthUser.dto'
import { FacebookGuard } from './guards/facebook.guard'
import { LocalGuard } from './guards/local.guard'
import { RefreshTokenGuard } from './guards/refresh.guard'
import { GoogleGuard } from './guards/google.guard'

@ApiTags('auth')
@UseInterceptors(CacheInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiBody({ required: true, type: UserLoginDto })
    @UseGuards(LocalGuard)
    async localLogin(
        @AuthUser() user: UserEntity,
        @Res({ passthrough: true }) res: Response
    ) {
        const accessToken = await this.authService.getUserAccessToken(user.userId)
        res.setHeader('accessToken', accessToken)

        const refreshToken = await this.authService.getUserRefreshToken(user.userId)
        await this.authService.storeRefreshToken(user.userId, refreshToken)
        res.setHeader('refreshToken', refreshToken)
    }

    @Post('register')
    async register(@Body() createUserDto: UserRegisterDto) {
        await this.authService.createAuthUser(createUserDto)
    }

    @Post('register-oauth')
    async registerOAuth(@Body() createUserDto: UserRegisterDto) {
        await this.authService.createAuthUser(createUserDto, false)
    }

    @Put('verify')
    async verify(
        @Body() verifyAuthUserDto: VerifyAuthUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const user = await this.authService.verifyAuthUserToRegister(verifyAuthUserDto)

        const accessToken = await this.authService.getUserAccessToken(user.userId)
        res.setHeader('accessToken', accessToken)

        const refreshToken = await this.authService.getUserRefreshToken(user.userId)
        await this.authService.storeRefreshToken(user.userId, refreshToken)
        res.setHeader('refreshToken', refreshToken)
    }

    @Post('forgetPassword')
    async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
        await this.authService.createAuthChangePassword(forgetPasswordDto)
    }

    @Put('newPassword')
    async newPassword(@Body() newPasswordDto: NewPassordWithSMSDto) {
        await this.authService.verifyAuthUserToChangePassword(newPasswordDto)
    }

    @Put('changePassword')
    async changePassword(@Body() newPasswordDto: NewPasswordWithComparationDto) {
        await this.authService.changeUserPassword(newPasswordDto)
    }

    @Get('refresh')
    @ApiBearerAuth()
    @UseGuards(RefreshTokenGuard)
    async refreshToken(
        @AuthUser() user: UserTokenPayload,
        @Res({ passthrough: true }) res: Response
    ) {
        const accessToken = await this.authService.getUserAccessToken(user.userId)
        res.setHeader('accessToken', accessToken)
    }

    @Get('facebook')
    @UseGuards(FacebookGuard)
    async facebookLogin(): Promise<any> {}

    @Get('facebook/redirect')
    @UseGuards(FacebookGuard)
    async facebookLoginRedirect(@Req() req, @Res() res): Promise<any> {
        const { accessToken, refreshToken, profile } = req.user
        res.setHeader('accessToken', accessToken)
        // const tokens = await this.authService.getTokens(user.userId)
        // res.setHeader('refreshToken', refreshToken)
        return res.redirect('https://localhost:3000/EUN#/auth')
    }

    @Get('google')
    @UseGuards(GoogleGuard)
    async googleLogin() {}

    @Get('google/redirect')
    @UseGuards(GoogleGuard)
    async googleAuthRedirect(@Req() req, @Res() res: Response) {
        try {
            await this.registerOAuth(req.user)
        } catch {
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
