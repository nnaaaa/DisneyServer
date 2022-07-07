import { forwardRef, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { BotModule } from 'src/modules/bot-module/bot/bot.module'
import { BotService } from 'src/modules/bot-module/bot/bot.service'
import { MailModule } from '../mail/mail.module'
import { MailService } from '../mail/mail.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { BotJwtStrategy } from './strategies/bot.strategy'
import { FacebookStrategy } from './strategies/facebook.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { UserJwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { RefreshTokenStrategy } from './strategies/refresh.strategy'

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('TOKEN_SECRET_KEY'),
            }),
            inject: [ConfigService],
        }),
        PassportModule,
        forwardRef(() => UserModule),
        forwardRef(() => BotModule),
        MailModule,
    ],
    providers: [
        BotService,
        UserService,
        MailService,
        ConfigService,
        AuthService,
        LocalStrategy,
        UserJwtStrategy,
        BotJwtStrategy,
        RefreshTokenStrategy,
        FacebookStrategy,
        GoogleStrategy,
    ],
    controllers: [AuthController],
    exports: [BotModule, UserModule, JwtModule, MailModule],
})
export class AuthModule {}
