import { forwardRef, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule } from '@nestjs/microservices'
import { PassportModule } from '@nestjs/passport'
import { Service, ServiceName } from 'src/shared/microservice/services'
import { MailModule } from '../mail/mail.module'
import { MailService } from '../mail/mail.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { FacebookStrategy } from './strategies/facebook.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
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
        MailModule,
    ],
    providers: [
        UserService,
        MailService,
        ConfigService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RefreshTokenStrategy,
        FacebookStrategy,
        GoogleStrategy
    ],
    controllers: [AuthController],
    exports: [UserModule, JwtModule],
})
export class AuthModule {}
