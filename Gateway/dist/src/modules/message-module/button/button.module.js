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
exports.ButtonModule = void 0
const common_1 = require('@nestjs/common')
const button_service_1 = require('./button.service')
const button_gateway_1 = require('./button.gateway')
const typeorm_1 = require('@nestjs/typeorm')
const button_entity_1 = require('../../../entities/button.entity')
const auth_module_1 = require('../../auth-module/auth/auth.module')
let ButtonModule = class ButtonModule {}
ButtonModule = __decorate(
    [
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([button_entity_1.ButtonEntity]),
                auth_module_1.AuthModule,
            ],
            providers: [button_service_1.ButtonService, button_gateway_1.ButtonGateway],
            exports: [button_service_1.ButtonService, typeorm_1.TypeOrmModule],
        }),
    ],
    ButtonModule
)
exports.ButtonModule = ButtonModule
//# sourceMappingURL=button.module.js.map
