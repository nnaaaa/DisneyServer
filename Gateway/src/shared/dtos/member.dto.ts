import { IsNotEmpty, IsUUID } from 'class-validator'

export class MemberDto {
    @IsUUID()
    @IsNotEmpty()
    memberId: string
}
