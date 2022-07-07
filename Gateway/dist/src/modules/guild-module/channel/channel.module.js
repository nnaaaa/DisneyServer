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
exports.ChannelModule = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const channel_entity_1 = require('../../../entities/channel.entity')
const auth_module_1 = require('../../auth-module/auth/auth.module')
const member_module_1 = require('../member/member.module')
const member_service_1 = require('../member/member.service')
const message_module_1 = require('../../message-module/message/message.module')
const message_service_1 = require('../../message-module/message/message.service')
const channel_gateway_1 = require('./channel.gateway')
const channel_service_1 = require('./channel.service')
let ChannelModule = class ChannelModule {}
ChannelModule = __decorate(
    [
        (0, common_1.Module)({
            imports: [
                auth_module_1.AuthModule,
                typeorm_1.TypeOrmModule.forFeature([channel_entity_1.ChannelEntity]),
                message_module_1.MessageModule,
                member_module_1.MemberModule,
            ],
            providers: [
                member_service_1.MemberService,
                message_service_1.MessageService,
                channel_gateway_1.ChannelGateway,
                channel_service_1.ChannelService,
            ],
            exports: [
                typeorm_1.TypeOrmModule,
                channel_service_1.ChannelService,
                message_module_1.MessageModule,
            ],
        }),
    ],
    ChannelModule
)
exports.ChannelModule = ChannelModule
//# sourceMappingURL=channel.module.js.map
