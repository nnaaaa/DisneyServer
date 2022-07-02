import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReactEntity } from 'src/entities/react.entity'
import { AuthModule } from '../auth/auth.module'
import { ReactGateway } from './react.gateway'
import { ReactService } from './react.service'

@Module({
    imports: [TypeOrmModule.forFeature([ReactEntity]), AuthModule],
    providers: [ReactGateway, ReactService],
    exports: [TypeOrmModule, ReactService],
})
export class ReactModule {}
