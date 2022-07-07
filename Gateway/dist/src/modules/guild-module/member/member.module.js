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
exports.MemberModule = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const member_entity_1 = require('../../../entities/member.entity')
const auth_module_1 = require('../../auth-module/auth/auth.module')
const message_module_1 = require('../../message-module/message/message.module')
const message_service_1 = require('../../message-module/message/message.service')
const react_module_1 = require('../../message-module/react/react.module')
const react_service_1 = require('../../message-module/react/react.service')
const member_gateway_1 = require('./member.gateway')
const member_service_1 = require('./member.service')
let MemberModule = class MemberModule {}
MemberModule = __decorate(
    [
        (0, common_1.Global)(),
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([member_entity_1.MemberEntity]),
                auth_module_1.AuthModule,
                message_module_1.MessageModule,
                react_module_1.ReactModule,
            ],
            providers: [
                message_service_1.MessageService,
                react_service_1.ReactService,
                member_service_1.MemberService,
                member_gateway_1.MemberGateway,
            ],
            exports: [
                typeorm_1.TypeOrmModule,
                member_service_1.MemberService,
                member_gateway_1.MemberGateway,
                message_module_1.MessageModule,
                react_module_1.ReactModule,
            ],
        }),
    ],
    MemberModule
)
exports.MemberModule = MemberModule
//# sourceMappingURL=member.module.js.map
