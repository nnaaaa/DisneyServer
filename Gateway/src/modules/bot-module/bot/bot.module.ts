import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotEntity } from 'src/entities/bot.entity';
import { BotService } from './bot.service';

@Module({
  imports:[TypeOrmModule.forFeature([BotEntity])],
  providers: [BotService],
  exports: [TypeOrmModule]
})
export class BotModule {}
