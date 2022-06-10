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
      subject: 'Welcome to Disney App! Confirm your Email',
      template: join(__dirname, 'templates/registerConfirm.pug'),
      attachments: [
        {
          filename: 'logo.jpg',
          path: join(__dirname, 'templates/logo.jpg'),
          cid: 'logo',
        },
      ],
      context: {
        digitCode,
      },
    })
  }
}
