import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { config } from 'dotenv'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserRegisterDto } from '../dtos/userRegister.dto'

config()

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(configService: ConfigService) {
        super({
            clientID: configService.get('GOOGLE_ID'),
            clientSecret: configService.get('GOOGLE_SECRET'),
            callbackURL: `http://${configService.get<string>(
                'SERVER_HOST'
            )}:${configService.get<string>('SERVER_PORT')}/auth/google/redirect`,
            scope: ['email', 'profile'],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const { picture, name, email, sub } = profile._json

        const user: UserRegisterDto = {
            account: email,
            avatarUrl: picture,
            name,
            password: sub,
        }

        done(null, user)
    }
}
