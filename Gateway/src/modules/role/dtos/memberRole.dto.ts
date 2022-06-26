import { IsNotEmpty, IsUUID } from 'class-validator'

export class MemberRoleDto {
    @IsNotEmpty()
    @IsUUID()
    roleId: string

    @IsNotEmpty()
    @IsUUID()
    guildMemberId: string
}
