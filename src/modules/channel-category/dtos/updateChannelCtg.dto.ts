import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateChannelCtgDto {
    @IsNotEmpty()
    @IsUUID()
    categoryId: string

    @IsOptional()
    @IsString()
    name?: string
}
