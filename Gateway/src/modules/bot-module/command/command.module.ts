import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandEntity } from 'src/entities/command.entity';
import { CommandService } from './command.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommandEntity])],
  providers: [CommandService],
  exports: [TypeOrmModule]
})
export class CommandModule {}
