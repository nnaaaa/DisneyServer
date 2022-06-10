import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-facebook'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('FACEBOOK_ID'),
      clientSecret: configService.get<string>('FACEBOOK_SECRET'),
      callbackURL: `http://${configService.get<string>(
        'SERVER_HOST'
      )}/auth/facebook/redirect`,
      scope: ['user_photos', 'email', 'public_profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    done(null, {
      user: profile,
      accessToken,
      refreshToken,
    })
  }
}
