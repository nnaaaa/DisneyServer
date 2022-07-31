import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as Joi from 'joi'
import { AuthModule } from './modules/auth-module/auth/auth.module'
import { MailModule } from './modules/auth-module/mail/mail.module'
import { UserModule } from './modules/auth-module/user/user.module'
import { BotModule } from './modules/bot-module/bot/bot.module'
import { CommandModule } from './modules/bot-module/command/command.module'
import { ChannelCategoryModule } from './modules/guild-module/channel-category/channel-category.module'
import { ChannelModule } from './modules/guild-module/channel/channel.module'
import { GuildModule } from './modules/guild-module/guild/guild.module'
import { MemberModule } from './modules/guild-module/member/member.module'
import { RoleModule } from './modules/guild-module/role/role.module'
import { EmojiModule } from './modules/message-module/emoji/emoji.module'
import { MessageModule } from './modules/message-module/message/message.module'
import { ReactModule } from './modules/message-module/react/react.module'
import { ActionModule } from './modules/message-module/action/action.module'
import { ButtonModule } from './modules/message-module/button/button.module'
import { FileModule } from './modules/auth-module/file/file.module';
import { SelectModule } from './modules/message-module/select/select.module';

@Module({
    imports: [
        CacheModule.register({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService) => ({
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DB'),
                type: 'mysql',
                // logging:true,
                synchronize: true,
                dropSchema: false,
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),

        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                SERVER_PORT: Joi.string().default(5000),
                TOKEN_SECRET_KEY: Joi.string().required(),
                EMAIL_HOST: Joi.string().required(),
                EMAIL_ACCOUNT: Joi.string().required(),
                EMAIL_PASSWORD: Joi.string().required(),
                FACEBOOK_ID: Joi.string().required(),
                FACEBOOK_SECRET: Joi.string().required(),
                GOOGLE_ID: Joi.string().required(),
                GOOGLE_SECRET: Joi.string().required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.string().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_DB: Joi.string().required(),
                // MESSAGE_BROKER_PORT: Joi.string().required(),
                // MESSAGE_BROKER_HOST: Joi.string().required(),
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
        ChannelCategoryModule,
        MemberModule,
        ReactModule,
        BotModule,
        CommandModule,
        ActionModule,
        ButtonModule,
        FileModule,
        SelectModule,
    ],
    providers: [],
})
export class AppModule {}
