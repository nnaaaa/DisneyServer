import { IsNotEmpty, IsUUID } from 'class-validator'

export class ChannelRoleDto {
    @IsNotEmpty()
    @IsUUID()
    roleId: string

    @IsNotEmpty()
    @IsUUID()
    channelId: string
}
