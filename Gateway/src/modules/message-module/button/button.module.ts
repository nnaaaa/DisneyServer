import { Module } from '@nestjs/common'
import { ButtonService } from './button.service'
import { ButtonGateway } from './button.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ButtonEntity } from 'src/entities/button.entity'
import { AuthModule } from 'src/modules/auth-module/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([ButtonEntity]), AuthModule],
    providers: [ButtonService, ButtonGateway],
    exports: [ButtonService, TypeOrmModule],
})
export class ButtonModule {}
