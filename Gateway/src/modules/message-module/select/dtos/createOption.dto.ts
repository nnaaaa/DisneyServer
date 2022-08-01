import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateOptionDto {
    @IsString()
    @IsNotEmpty()
    value: string

    @IsString()
    @IsOptional()
    description?: string
}
