export declare class ForgetPasswordDto {
    readonly account: string;
}
export declare class NewPasswordDto extends ForgetPasswordDto {
    readonly newPassword: string;
}
export declare class NewPassordWithSMSDto extends NewPasswordDto {
    readonly digitCode: number;
}
export declare class NewPasswordWithComparationDto extends NewPasswordDto {
    readonly oldPassword: string;
}
