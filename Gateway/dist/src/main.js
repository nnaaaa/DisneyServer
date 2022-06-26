"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, disableErrorMessages: false }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Disney Server')
        .setDescription('Disney API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const versionAPI = 'api/v1';
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(versionAPI, app, document);
    await app.listen(configService.get('SERVER_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map