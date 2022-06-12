import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('TOKEN_SECRET_KEY'),
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [JwtModule]
})
export class UtilityModule { }
