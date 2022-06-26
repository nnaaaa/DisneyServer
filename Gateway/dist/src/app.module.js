"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const guild_module_1 = require("./modules/guild/guild.module");
const message_module_1 = require("./modules/message/message.module");
const channel_module_1 = require("./modules/channel/channel.module");
const role_module_1 = require("./modules/role/role.module");
const emoji_module_1 = require("./modules/emoji/emoji.module");
const mail_module_1 = require("./modules/mail/mail.module");
const utility_module_1 = require("./modules/utility/utility.module");
const channel_category_module_1 = require("./modules/channel-category/channel-category.module");
const guild_member_module_1 = require("./modules/guild-member/guild-member.module");
const Joi = require("joi");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DB'),
                    type: 'mysql',
                    synchronize: true,
                    dropSchema: false,
                    autoLoadEntities: true,
                }),
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    SERVER_PORT: Joi.string().default(5000),
                    TOKEN_SECRET_KEY: Joi.string().required(),
                    EMAIL_HOST: Joi.string().required(),
                    EMAIL_ACCOUNT: Joi.string().required(),
                    EMAIL_PASSWORD: Joi.string().required(),
                    FACEBOOK_ID: Joi.string().required(),
                    FACEBOOK_SECRET: Joi.string().required(),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.string().required(),
                    DB_USER: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_DB: Joi.string().required(),
                    MESSAGE_BROKER_PORT: Joi.string().required(),
                    MESSAGE_BROKER_HOST: Joi.string().required(),
                }),
                validationOptions: {
                    abortEarly: true,
                },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            guild_module_1.GuildModule,
            message_module_1.MessageModule,
            channel_module_1.ChannelModule,
            role_module_1.RoleModule,
            emoji_module_1.EmojiModule,
            mail_module_1.MailModule,
            utility_module_1.UtilityModule,
            channel_category_module_1.ChannelCategoryModule,
            guild_member_module_1.GuildMemberModule,
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map