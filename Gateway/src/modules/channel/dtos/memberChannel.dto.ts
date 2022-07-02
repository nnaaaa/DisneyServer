import { IsNotEmpty, IsUUID } from 'class-validator'

export class MemberChannelDto {
    @IsNotEmpty()
    @IsUUID()
    channelId: string

    @IsNotEmpty()
    @IsUUID()
    memberId: string
}
