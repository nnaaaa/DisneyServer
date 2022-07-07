import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class GenSecretKeyDto {
    @IsUUID()
    @IsNotEmpty()
    botId: string

    @IsString()
    @IsNotEmpty()
    oldSecretKey: string
}
