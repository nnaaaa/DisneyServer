import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class UserRegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Account',
        example: 'example@gamil.com',
        required: true,
    })
    public readonly account: string

    @IsNotEmpty()
    @ApiProperty({
        description: 'Password',
        example: 'password',
        required: true,
    })
    public readonly password: string

    @IsOptional()
    @ApiProperty({
        description: 'Avatar url',
        example: 'http://avatar',
        required: false,
    })
    public readonly avatarUrl: string

    @IsNotEmpty()
    @ApiProperty({
        description: 'Name',
        example: 'name',
        required: true,
    })
    public readonly name: string
}
