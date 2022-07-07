import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCommandDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string
}
