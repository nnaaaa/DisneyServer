import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BotEntity } from 'src/entities/bot.entity'
import { BotService } from './bot.service'
import { BotController } from './bot.controller'
import { AuthModule } from 'src/modules/auth-module/auth/auth.module'
import { AuthService } from 'src/modules/auth-module/auth/auth.service'

@Module({
    imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([BotEntity])],
    providers: [AuthService, BotService],
    controllers: [BotController],
    exports: [TypeOrmModule, BotService],
})
export class BotModule {}
