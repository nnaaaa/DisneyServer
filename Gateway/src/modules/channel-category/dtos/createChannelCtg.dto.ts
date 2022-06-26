import { IsNotEmpty, IsString } from 'class-validator'

export class CreateChannelCtgDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
