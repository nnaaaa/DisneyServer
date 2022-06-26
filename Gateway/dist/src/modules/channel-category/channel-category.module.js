"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const channelCategory_entity_1 = require("../../entities/channelCategory.entity");
const channel_module_1 = require("../channel/channel.module");
const channel_service_1 = require("../channel/channel.service");
const guild_module_1 = require("../guild/guild.module");
const guild_service_1 = require("../guild/guild.service");
const user_module_1 = require("../user/user.module");
const utility_module_1 = require("../utility/utility.module");
const channel_category_gateway_1 = require("./channel-category.gateway");
const channel_category_service_1 = require("./channel-category.service");
let ChannelCategoryModule = class ChannelCategoryModule {
};
ChannelCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            utility_module_1.UtilityModule,
            typeorm_1.TypeOrmModule.forFeature([channelCategory_entity_1.ChannelCategoryEntity]),
            (0, common_1.forwardRef)(() => guild_module_1.GuildModule),
            (0, common_1.forwardRef)(() => channel_module_1.ChannelModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        exports: [typeorm_1.TypeOrmModule, channel_category_service_1.ChannelCategoryService, channel_module_1.ChannelModule],
        providers: [
            channel_category_gateway_1.ChannelCategoryGateway,
            channel_category_service_1.ChannelCategoryService,
            channel_service_1.ChannelService,
            guild_service_1.GuildService,
        ],
    })
], ChannelCategoryModule);
exports.ChannelCategoryModule = ChannelCategoryModule;
//# sourceMappingURL=channel-category.module.js.map