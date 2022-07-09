import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArgumentEntity } from 'src/entities/argument.entity'
import { ArgumentController } from './argument.controller'
import { ArgumentService } from './argument.service'

@Module({
    imports: [TypeOrmModule.forFeature([ArgumentEntity])],
    controllers: [ArgumentController],
    providers: [ArgumentService],
})
export class ArgumentModule {}
