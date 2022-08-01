import {
    IsAlphanumeric,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    MinLength,
} from 'class-validator'

export class UserRegisterDto {
    @IsEmail()
    @IsNotEmpty()
    public readonly account: string

    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(8)
    @MaxLength(16)
    public readonly password: string

    @IsOptional()
    @IsUrl()
    public readonly avatarUrl: string

    @IsNotEmpty()
    @IsString()
    public readonly name: string
}
