import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommandEntity } from 'src/entities/command.entity'
import { CommandService } from './command.service'
import { CommandController } from './command.controller'
import { AuthModule } from 'src/modules/auth-module/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([CommandEntity]), AuthModule],
    providers: [CommandService],
    exports: [TypeOrmModule],
    controllers: [CommandController],
})
export class CommandModule {}
