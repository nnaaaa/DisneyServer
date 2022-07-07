'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const mongoose_1 = require('@nestjs/mongoose');
const Joi = require('joi');
const message_module_1 = require('./modules/message/message.module');
const user_module_1 = require('./modules/user/user.module');
let AppModule = class AppModule {};
AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        mongoose_1.MongooseModule.forRootAsync({
          useFactory: (configService) => ({
            uri: `mongodb://${configService.get('DB_USER')}:${configService.get(
              'DB_PASSWORD',
            )}@${configService.get('DB_HOST')}:${configService.get(
              'DB_PORT',
            )}/${configService.get('DB_DB')}?authSource=admin`,
            useNewUrlParser: true,
            connectionFactory: (connection) => {
              connection.plugin(require('mongoose-autopopulate'));
              return connection;
            },
          }),
          inject: [config_1.ConfigService],
        }),
        config_1.ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            DB_HOST: Joi.string().required(),
            DB_PORT: Joi.string().required(),
            DB_USER: Joi.string().required(),
            DB_PASSWORD: Joi.string().required(),
            DB_DB: Joi.string().required(),
            MESSAGE_BROKER_PORT: Joi.string().required(),
            MESSAGE_BROKER_HOST: Joi.string().required(),
          }),
          validationOptions: {
            abortEarly: true,
          },
        }),
        message_module_1.MessageModule,
        user_module_1.UserModule,
      ],
      controllers: [],
      providers: [],
    }),
  ],
  AppModule,
);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
