import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthUser } from 'src/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { AuthService } from './auth.service'
import {
  ForgetPasswordDto,
  NewPassordWithSMSDto,
  NewPasswordDto,
  NewPasswordWithComparation,
} from './dtos/forgetPassword.dto'
import { TokenPayload } from './dtos/TokenPayload.dto'
import { UserLoginDto } from './dtos/userLogin.dto'
import { UserRegisterDto } from './dtos/userRegister.dto'
import { VerifyAuthUserDto } from './dtos/verifyAuthUser.dto'
import { FacebookGuard } from './guards/facebook.guard'
import { LocalGuard } from './guards/local.guard'
import { RefreshTokenGuard } from './guards/refresh.guard'

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
    const accessToken = await this.authService.getAccessToken(user.userId)
    res.setHeader('accessToken', accessToken)

    const refreshToken = await this.authService.getRefreshToken(user.userId)
    await this.authService.storeRefreshToken(user.userId, refreshToken)
    res.setHeader('refreshToken', refreshToken)
  }

  @Post('register')
  @ApiBody({ required: true, type: UserRegisterDto })
  async register(@Body() createUserDto: UserRegisterDto) {
    await this.authService.createAuthUser(createUserDto)
  }

  @Post('verify')
  async verify(
    @Body() verifyAuthUserDto: VerifyAuthUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authService.verifyAuthUserToRegister(
      verifyAuthUserDto
    )

    const accessToken = await this.authService.getAccessToken(user.userId)
    res.setHeader('accessToken', accessToken)

    const refreshToken = await this.authService.getRefreshToken(user.userId)
    await this.authService.storeRefreshToken(user.userId, refreshToken)
    res.setHeader('refreshToken', refreshToken)
  }

  @Post('forgetPassword')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    await this.authService.createAuthChangePassword(forgetPasswordDto)
  }

  @Post('newPassword')
  async newPassword(@Body() newPasswordDto: NewPassordWithSMSDto) {
    await this.authService.verifyAuthUserToChangePassword(newPasswordDto)
  }

  @Post('changePassword')
  async changePassword(@Body() newPasswordDto: NewPasswordWithComparation) {
    await this.authService.changeUserPassword(newPasswordDto)
  }

  @Get('facebook')
  @UseGuards(FacebookGuard)
  async facebookLogin(): Promise<any> {}

  @Get('facebook/redirect')
  @UseGuards(FacebookGuard)
  async facebookLoginRedirect(
    @Req() req,
    @Res({ passthrough: true }) res
  ): Promise<any> {
    const { accessToken, refreshToken, profile } = req.user
    res.setHeader('accessToken', accessToken)
    // const tokens = await this.authService.getTokens(user.userId)
    // res.setHeader('refreshToken', refreshToken)
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @AuthUser() user: TokenPayload,
    @Res({ passthrough: true }) res: Response
  ) {
    const accessToken = await this.authService.getAccessToken(user.userId)
    res.setHeader('accessToken', accessToken)
  }
}
