import { MailerService } from '@nestjs-modules/mailer';
import { UserRegisterDto } from '../auth/dtos/userRegister.dto';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    registerConfirm(user: UserRegisterDto, digitCode: number): Promise<void>;
    changePasswordConfirm(account: string, digitCode: number): Promise<void>;
}
