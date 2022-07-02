import { IsNotEmpty, IsUUID } from 'class-validator'

export class ChannelDto {
    @IsUUID()
    @IsNotEmpty()
    channelId: string
}
