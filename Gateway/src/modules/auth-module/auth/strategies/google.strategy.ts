import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

config();

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
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile

        done(null, profile);
    }
}