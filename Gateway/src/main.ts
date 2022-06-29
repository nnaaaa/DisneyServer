import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    const configService: ConfigService = app.get(ConfigService)

    app.useGlobalPipes(
        new ValidationPipe({ transform: true, disableErrorMessages: false })
    )

    const config = new DocumentBuilder()
        .setTitle('Disney Server')
        .setDescription('Disney API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const versionAPI = 'api/v1'
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup(versionAPI, app, document)

    await app.listen(configService.get('SERVER_PORT'))
}
bootstrap()
