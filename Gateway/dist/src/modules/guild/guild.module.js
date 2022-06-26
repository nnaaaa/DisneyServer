"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const guild_entity_1 = require("../../entities/guild.entity");
const channel_category_module_1 = require("../channel-category/channel-category.module");
const channel_category_service_1 = require("../channel-category/channel-category.service");
const channel_gateway_1 = require("../channel/channel.gateway");
const channel_module_1 = require("../channel/channel.module");
const channel_service_1 = require("../channel/channel.service");
const guild_member_module_1 = require("../guild-member/guild-member.module");
const guild_member_service_1 = require("../guild-member/guild-member.service");
const role_module_1 = require("../role/role.module");
const role_service_1 = require("../role/role.service");
const user_module_1 = require("../user/user.module");
const utility_module_1 = require("../utility/utility.module");
const guild_gateway_1 = require("./guild.gateway");
const guild_service_1 = require("./guild.service");
let GuildModule = class GuildModule {
};
GuildModule = __decorate([
    (0, common_1.Module)({
        imports: [
            utility_module_1.UtilityModule,
            typeorm_1.TypeOrmModule.forFeature([guild_entity_1.GuildEntity]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => channel_category_module_1.ChannelCategoryModule),
            (0, common_1.forwardRef)(() => channel_module_1.ChannelModule),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            guild_member_module_1.GuildMemberModule,
        ],
        providers: [
            guild_member_service_1.GuildMemberService,
            channel_category_service_1.ChannelCategoryService,
            channel_service_1.ChannelService,
            role_service_1.RoleService,
            guild_service_1.GuildService,
            channel_gateway_1.ChannelGateway,
            guild_gateway_1.GuildGateway,
        ],
        exports: [typeorm_1.TypeOrmModule, guild_service_1.GuildService],
    })
], GuildModule);
exports.GuildModule = GuildModule;
//# sourceMappingURL=guild.module.js.map