import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MesssageEntity } from 'src/entities/message.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MesssageEntity])],
})
export class MessageModule {}
