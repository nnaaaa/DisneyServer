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
exports.ActionModule = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const action_entity_1 = require('../../../entities/action.entity')
const auth_module_1 = require('../../auth-module/auth/auth.module')
const button_module_1 = require('../button/button.module')
const button_service_1 = require('../button/button.service')
const react_module_1 = require('../react/react.module')
const react_service_1 = require('../react/react.service')
const action_gateway_1 = require('./action.gateway')
const action_service_1 = require('./action.service')
let ActionModule = class ActionModule {}
ActionModule = __decorate(
    [
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([action_entity_1.ActionEntity]),
                button_module_1.ButtonModule,
                react_module_1.ReactModule,
                auth_module_1.AuthModule,
            ],
            providers: [
                button_service_1.ButtonService,
                react_service_1.ReactService,
                action_service_1.ActionService,
                action_gateway_1.ActionGateway,
            ],
            exports: [
                typeorm_1.TypeOrmModule,
                action_service_1.ActionService,
                button_module_1.ButtonModule,
                react_module_1.ReactModule,
            ],
        }),
    ],
    ActionModule
)
exports.ActionModule = ActionModule
//# sourceMappingURL=action.module.js.map
