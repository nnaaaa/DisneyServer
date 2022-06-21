import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { GuildModule } from './modules/guild/guild.module'
import { MessageModule } from './modules/message/message.module'
import { ChannelModule } from './modules/channel/channel.module'
import { RoleModule } from './modules/role/role.module'
import { EmojiModule } from './modules/emoji/emoji.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { MailModule } from './modules/mail/mail.module'
import { UtilityModule } from './modules/utility/utility.module'
import { ChannelCategoryModule } from './modules/channel-category/channel-category.module'
import { GuildMemberModule } from './modules/guild-member/guild-member.module'
import * as Joi from 'joi'

@Module({
    imports: [
        CacheModule.register({ isGlobal: true }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        // TypeOrmModule.forRoot({
        //   ...config,
        //   host: 'localhost',
        //   port: 3306,
        //   username: 'root',
        //   password: '12345',
        //   database: 'disney',
        //   
        //   autoLoadEntities: true,

        // }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService) => ({
                // host: configService.get('MYSQL_DATABASE_HOST'),
                // port: configService.get('MYSQL_DATABASE_PORT'),
                // username: configService.get('MYSQL_DATABASE_USERNAME'),
                // password: configService.get('MYSQL_DATABASE_PASSWORD'),
                // database: configService.get('MYSQL_DATABASE_NAME'),
                version: '4.0.0',
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '12345',
                database: 'disney',
                synchronize: true,
                dropSchema: false,
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.string().default(3000),
                TOKEN_SECRET_KEY: Joi.string().required(),
                EMAIL_HOST: Joi.string().required(),
                EMAIL_ACCOUNT: Joi.string().required(),
                EMAIL_PASSWORD: Joi.string().required(),
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
        MailModule,
        UtilityModule,
        ChannelCategoryModule,
        GuildMemberModule,
    ],
    providers: [],
})
export class AppModule { }
