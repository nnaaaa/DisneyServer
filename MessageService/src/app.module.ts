import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { Connection } from 'mongoose';
import { MessageModule } from './modules/message/message.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService) => ({
    //     host: configService.get('DB_HOST'),
    //     port: configService.get('DB_PORT'),
    //     username: configService.get('DB_USER'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_DB'),
    //     authSource: 'admin',
    //     type: 'mongodb',
    //     synchronize: true,
    //     dropSchema: false,
    //     autoLoadEntities: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DB_USER')}:${configService.get(
          'DB_PASSWORD'
        )}@${configService.get('DB_HOST')}:${configService.get(
          'DB_PORT'
          )}/${configService.get('DB_DB')}?authSource=admin`,
        useNewUrlParser: true,
        connectionFactory: (connection: Connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot('mongodb://localhost/test', {
    //   connectionFactory: (connection) => {
    //     connection.plugin(require('mongoose-autopopulate'));
    //     return connection;
    //   },
    // }),

    ConfigModule.forRoot({
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
        // allowUnknown: false,
        abortEarly: true,
      },
    }),
    MessageModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
