import { CreateButtonDto } from './createButton.dto'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class UpdateButtonDto extends CreateButtonDto {
    @IsUUID()
    @IsNotEmpty()
    buttonId: string
}
