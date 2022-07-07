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
exports.ReactModule = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const react_entity_1 = require('../../../entities/react.entity')
const auth_module_1 = require('../../auth-module/auth/auth.module')
const react_gateway_1 = require('./react.gateway')
const react_service_1 = require('./react.service')
let ReactModule = class ReactModule {}
ReactModule = __decorate(
    [
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([react_entity_1.ReactEntity]),
                auth_module_1.AuthModule,
            ],
            providers: [react_gateway_1.ReactGateway, react_service_1.ReactService],
            exports: [typeorm_1.TypeOrmModule, react_service_1.ReactService],
        }),
    ],
    ReactModule
)
exports.ReactModule = ReactModule
//# sourceMappingURL=react.module.js.map
