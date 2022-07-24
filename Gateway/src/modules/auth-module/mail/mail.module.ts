import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { join } from 'path'
import { MailService } from './mail.service'

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    transport: {
                        host: configService.get<string>('EMAIL_HOST'),
                        secure: false,
                        auth: {
                            user: configService.get<string>('EMAIL_ACCOUNT'),
                            pass: configService.get<string>('EMAIL_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: '"Disney" disney@gmail.com',
                    },
                    preview: true,
                    template: {
                        dir: join(process.cwd(), 'dist/templates/mail'),
                        adapter: new PugAdapter({ inlineCssEnabled: true }),
                        options: {
                            strict: true,
                        },
                    },
                }
            },
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
