import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { ForgetPasswordDto, NewPassordWithSMSDto, NewPasswordWithComparationDto } from './dtos/forgetPassword.dto';
import { UserRegisterDto } from './dtos/userRegister.dto';
import { VerifyAuthUserDto } from './dtos/verifyAuthUser.dto';
export declare class AuthService {
    private jwtService;
    private userService;
    private mailService;
    constructor(jwtService: JwtService, userService: UserService, mailService: MailService);
    verifyToken(token: string): any;
    getAccessToken(userId: string): Promise<string>;
    getRefreshToken(userId: string): Promise<string>;
    createAuthUser(userRegisterDto: UserRegisterDto): Promise<void>;
    createAuthChangePassword({ account }: ForgetPasswordDto): Promise<void>;
    verifyAuthUserToChangePassword(newPassordWithSMSDto: NewPassordWithSMSDto): Promise<void>;
    verifyAuthUserToRegister({ account, digitCode }: VerifyAuthUserDto): Promise<import("../../entities/user.entity").UserEntity>;
    changeUserPassword(newPassordWithComparation: NewPasswordWithComparationDto): Promise<void>;
    storeRefreshToken(userId: string, refreshToken: string): Promise<void>;
}
