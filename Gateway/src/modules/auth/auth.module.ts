import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule } from '@nestjs/microservices'
import { PassportModule } from '@nestjs/passport'
import { Service, ServiceName } from 'src/shared/services'
import { MailModule } from '../mail/mail.module'
import { MailService } from '../mail/mail.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { UtilityModule } from '../utility/utility.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { FacebookStrategy } from './strategies/facebook.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { RefreshTokenStrategy } from './strategies/refresh.strategy'

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: ServiceName.MESSAGE,
                useFactory: Service.messageFactory,
                inject: [ConfigService]
            }
        ]),
        UtilityModule,
        PassportModule,
        UserModule,
        MailModule
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
    ],
    controllers: [AuthController],
})
export class AuthModule {}
