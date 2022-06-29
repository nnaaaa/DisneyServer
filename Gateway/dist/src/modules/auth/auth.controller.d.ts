import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { ForgetPasswordDto, NewPassordWithSMSDto, NewPasswordWithComparationDto } from './dtos/forgetPassword.dto';
import { TokenPayload } from './dtos/tokenPayload.dto';
import { UserRegisterDto } from './dtos/userRegister.dto';
import { VerifyAuthUserDto } from './dtos/verifyAuthUser.dto';
export declare class AuthController {
    private authService;
    private messageClient;
    constructor(authService: AuthService, messageClient: ClientKafka);
    localLogin(user: UserEntity, res: Response): Promise<void>;
    register(createUserDto: UserRegisterDto): Promise<void>;
    verify(verifyAuthUserDto: VerifyAuthUserDto, res: Response): Promise<void>;
    forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<void>;
    newPassword(newPasswordDto: NewPassordWithSMSDto): Promise<void>;
    changePassword(newPasswordDto: NewPasswordWithComparationDto): Promise<void>;
    facebookLogin(): Promise<any>;
    facebookLoginRedirect(req: any, res: any): Promise<any>;
    refreshToken(user: TokenPayload, res: Response): Promise<void>;
}
