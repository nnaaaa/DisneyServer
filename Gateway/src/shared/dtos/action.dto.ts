import { IsNotEmpty, IsUUID } from 'class-validator'

export class ActionDto {
    @IsUUID()
    @IsNotEmpty()
    actionId: string
}
