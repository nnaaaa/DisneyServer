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
exports.ChannelCategoryModule = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const channelCategory_entity_1 = require('../../../entities/channelCategory.entity')
const auth_module_1 = require('../../auth-module/auth/auth.module')
const channel_module_1 = require('../channel/channel.module')
const channel_service_1 = require('../channel/channel.service')
const channel_category_gateway_1 = require('./channel-category.gateway')
const channel_category_service_1 = require('./channel-category.service')
let ChannelCategoryModule = class ChannelCategoryModule {}
ChannelCategoryModule = __decorate(
    [
        (0, common_1.Module)({
            imports: [
                auth_module_1.AuthModule,
                typeorm_1.TypeOrmModule.forFeature([
                    channelCategory_entity_1.ChannelCategoryEntity,
                ]),
                channel_module_1.ChannelModule,
            ],
            providers: [
                channel_category_gateway_1.ChannelCategoryGateway,
                channel_category_service_1.ChannelCategoryService,
                channel_service_1.ChannelService,
            ],
            exports: [
                typeorm_1.TypeOrmModule,
                channel_category_service_1.ChannelCategoryService,
                channel_module_1.ChannelModule,
            ],
        }),
    ],
    ChannelCategoryModule
)
exports.ChannelCategoryModule = ChannelCategoryModule
//# sourceMappingURL=channel-category.module.js.map
