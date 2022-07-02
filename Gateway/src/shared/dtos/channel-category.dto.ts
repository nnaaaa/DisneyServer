import { IsNotEmpty, IsUUID } from 'class-validator'

export class ChannelCategoryDto {
    @IsUUID()
    @IsNotEmpty()
    categoryId: string
}
