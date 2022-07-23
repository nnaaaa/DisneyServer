import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { UserRegisterDto } from '../auth/dtos/userRegister.dto'
import { join } from 'path'

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async registerConfirm(user: UserRegisterDto, digitCode: number) {
        await this.mailerService.sendMail({
            to: user.account,
            subject: 'Disney Registration Confirmation',
            template: 'registerConfirm',
            attachments: [
                {
                    // filename: 'logo.png',
                    path: join(process.cwd(), 'dist/templates/mail/logo.png'),
                    cid: 'logo',
                },
            ],
            context: {
                name: user.name,
                digitCode,
            },
        })
    }

    async changePasswordConfirm(account: string, digitCode: number) {
        await this.mailerService.sendMail({
            to: account,
            subject: 'Disney Password Reset Confirmation',
            template: 'changePwdConfirm',
            attachments: [
                {
                    path: join(process.cwd(), 'dist/templates/mail/logo.png'),
                    cid: 'logo',
                },
            ],
            context: {
                digitCode,
            },
        })
    }
}
