import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateCommandDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    args?: string[]
}
