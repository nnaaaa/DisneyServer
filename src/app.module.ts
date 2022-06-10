import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'ormconfig'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { GuildModule } from './modules/guild/guild.module'
import { MessageModule } from './modules/message/message.module'
import { ChannelModule } from './modules/channel/channel.module'
import { RoleModule } from './modules/role/role.module'
import { EmojiModule } from './modules/emoji/emoji.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import * as Joi from 'joi'

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      ...config,
      // dropSchema:false,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SERVER_HOST: Joi.string().default('http://localhost:3000'),
        TOKEN_SECRET_KEY: Joi.string().required(),
        FACEBOOK_ID: Joi.string().required(),
        FACEBOOK_SECRET: Joi.string().required(),
      }),
      validationOptions: {
        // allowUnknown: false,
        abortEarly: true,
      },
    }),
    AuthModule,
    UserModule,
    GuildModule,
    MessageModule,
    ChannelModule,
    RoleModule,
    EmojiModule,
  ],
  providers: [],
})
export class AppModule {}
