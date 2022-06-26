"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const channel_entity_1 = require("../../entities/channel.entity");
const channel_category_module_1 = require("../channel-category/channel-category.module");
const channel_category_service_1 = require("../channel-category/channel-category.service");
const guild_member_module_1 = require("../guild-member/guild-member.module");
const guild_member_service_1 = require("../guild-member/guild-member.service");
const guild_module_1 = require("../guild/guild.module");
const role_module_1 = require("../role/role.module");
const role_service_1 = require("../role/role.service");
const user_module_1 = require("../user/user.module");
const utility_module_1 = require("../utility/utility.module");
const channel_gateway_1 = require("./channel.gateway");
const channel_service_1 = require("./channel.service");
let ChannelModule = class ChannelModule {
};
ChannelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            utility_module_1.UtilityModule,
            typeorm_1.TypeOrmModule.forFeature([channel_entity_1.ChannelEntity]),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            (0, common_1.forwardRef)(() => guild_module_1.GuildModule),
            (0, common_1.forwardRef)(() => channel_category_module_1.ChannelCategoryModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            guild_member_module_1.GuildMemberModule,
        ],
        providers: [
            channel_gateway_1.ChannelGateway,
            channel_category_service_1.ChannelCategoryService,
            channel_service_1.ChannelService,
            role_service_1.RoleService,
            guild_member_service_1.GuildMemberService,
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            channel_service_1.ChannelService,
            guild_member_module_1.GuildMemberModule,
            role_module_1.RoleModule,
            channel_gateway_1.ChannelGateway,
        ],
    })
], ChannelModule);
exports.ChannelModule = ChannelModule;
//# sourceMappingURL=channel.module.js.map