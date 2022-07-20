"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const bot_module_1 = require("../../bot-module/bot/bot.module");
const bot_service_1 = require("../../bot-module/bot/bot.service");
const mail_module_1 = require("../mail/mail.module");
const mail_service_1 = require("../mail/mail.service");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const bot_strategy_1 = require("./strategies/bot.strategy");
const facebook_strategy_1 = require("./strategies/facebook.strategy");
const google_strategy_1 = require("./strategies/google.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
const refresh_strategy_1 = require("./strategies/refresh.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => ({
                    secret: configService.get('TOKEN_SECRET_KEY'),
                }),
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => bot_module_1.BotModule),
            mail_module_1.MailModule,
        ],
        providers: [
            bot_service_1.BotService,
            user_service_1.UserService,
            mail_service_1.MailService,
            config_1.ConfigService,
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.UserJwtStrategy,
            bot_strategy_1.BotJwtStrategy,
            refresh_strategy_1.RefreshTokenStrategy,
            facebook_strategy_1.FacebookStrategy,
            google_strategy_1.GoogleStrategy,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [bot_module_1.BotModule, user_module_1.UserModule, jwt_1.JwtModule, mail_module_1.MailModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map