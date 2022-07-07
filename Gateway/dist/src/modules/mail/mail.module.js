'use strict'
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.MailModule = void 0
const common_1 = require('@nestjs/common')
const mailer_1 = require('@nestjs-modules/mailer')
const config_1 = require('@nestjs/config')
const pug_adapter_1 = require('@nestjs-modules/mailer/dist/adapters/pug.adapter')
const path_1 = require('path')
const mail_service_1 = require('./mail.service')
let MailModule = class MailModule {}
MailModule = __decorate(
    [
        (0, common_1.Module)({
            imports: [
                mailer_1.MailerModule.forRootAsync({
                    useFactory: (configService) => {
                        return {
                            transport: {
                                host: configService.get('EMAIL_HOST'),
                                secure: false,
                                auth: {
                                    user: configService.get('EMAIL_ACCOUNT'),
                                    pass: configService.get('EMAIL_PASSWORD'),
                                },
                            },
                            defaults: {
                                from: '"Disney" <noreply@example.com>',
                            },
                            preview: true,
                            template: {
                                dir: (0, path_1.join)(__dirname, 'templates'),
                                adapter: new pug_adapter_1.PugAdapter({
                                    inlineCssEnabled: true,
                                }),
                                options: {
                                    strict: true,
                                },
                            },
                        }
                    },
                    inject: [config_1.ConfigService],
                }),
            ],
            providers: [mail_service_1.MailService],
        }),
    ],
    MailModule
)
exports.MailModule = MailModule
//# sourceMappingURL=mail.module.js.map
