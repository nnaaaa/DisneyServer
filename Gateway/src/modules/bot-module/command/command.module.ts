import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommandEntity } from 'src/entities/command.entity'
import { CommandService } from './command.service'
import { CommandController } from './command.controller'

@Module({
    imports: [TypeOrmModule.forFeature([CommandEntity])],
    providers: [CommandService],
    exports: [TypeOrmModule],
    controllers: [CommandController],
})
export class CommandModule {}
