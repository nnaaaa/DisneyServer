'use strict'
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
            d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.MessageModule = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const message_entity_1 = require('../../entities/message.entity')
const auth_module_1 = require('../auth/auth.module')
const react_module_1 = require('../react/react.module')
const react_service_1 = require('../react/react.service')
const message_gateway_1 = require('./message.gateway')
const message_service_1 = require('./message.service')
let MessageModule = class MessageModule {}
MessageModule = __decorate(
    [
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([message_entity_1.MessageEntity]),
                auth_module_1.AuthModule,
                react_module_1.ReactModule,
            ],
            providers: [
                react_service_1.ReactService,
                message_service_1.MessageService,
                message_gateway_1.MessageGateway,
            ],
            exports: [
                typeorm_1.TypeOrmModule,
                message_service_1.MessageService,
                react_module_1.ReactModule,
            ],
        }),
    ],
    MessageModule
)
exports.MessageModule = MessageModule
//# sourceMappingURL=message.module.js.map
