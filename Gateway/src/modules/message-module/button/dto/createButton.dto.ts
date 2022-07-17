import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateButtonDto {
    @IsString()
    @IsOptional()
    customId: string

    @IsString()
    @IsNotEmpty()
    name: string
}
