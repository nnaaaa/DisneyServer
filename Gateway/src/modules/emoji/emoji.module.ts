import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmojiEntity } from 'src/entities/emoji.entity'
import { AuthModule } from '../auth/auth.module'
import { ReactModule } from '../react/react.module'
import { ReactService } from '../react/react.service'
import { EmojiGateway } from './emoji.gateway'
import { EmojiService } from './emoji.service'

@Module({
    imports: [TypeOrmModule.forFeature([EmojiEntity]), AuthModule, ReactModule],
    providers: [EmojiService, EmojiGateway, ReactService],
    exports: [TypeOrmModule, EmojiService, ReactModule],
})
export class EmojiModule {}
