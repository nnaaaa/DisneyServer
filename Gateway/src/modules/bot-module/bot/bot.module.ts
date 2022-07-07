import { forwardRef, Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BotEntity } from 'src/entities/bot.entity'
import { AuthModule } from 'src/modules/auth-module/auth/auth.module'
import { AuthService } from 'src/modules/auth-module/auth/auth.service'
import { BotController } from './bot.controller'
import { BotService } from './bot.service'

@Global()
@Module({
    imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([BotEntity])],
    providers: [AuthService, BotService],
    controllers: [BotController],
    exports: [TypeOrmModule, BotService],
})
export class BotModule {}
