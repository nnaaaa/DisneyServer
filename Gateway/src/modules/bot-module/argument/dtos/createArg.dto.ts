import { IsNotEmpty, IsString } from 'class-validator'

export class CreateArgDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    value: string
}
