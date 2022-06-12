import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelCategoryEntity } from 'src/entities/channelCategory.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ChannelCategoryEntity])],
    exports: [TypeOrmModule]
})
export class ChannelCategoryModule {}
