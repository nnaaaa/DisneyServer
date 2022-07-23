import { Module } from '@nestjs/common';
import { SelectService } from './select.service';
import { SelectGateway } from './select.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectEntity } from 'src/entities/select.entity';
import { OptionEntity } from 'src/entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SelectEntity, OptionEntity])],
  providers: [SelectService, SelectGateway],
  exports: [TypeOrmModule, SelectService],
})
export class SelectModule {}
