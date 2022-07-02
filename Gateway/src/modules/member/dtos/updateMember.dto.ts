import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateMemberDto {
    @IsString()
    @IsNotEmpty()
    memberId: string

    @IsOptional()
    @IsString()
    nickname?: string

    @IsOptional()
    @IsString()
    avatarUrl?: string
}
