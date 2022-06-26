"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("../../entities/role.entity");
const channel_category_module_1 = require("../channel-category/channel-category.module");
const channel_gateway_1 = require("../channel/channel.gateway");
const channel_module_1 = require("../channel/channel.module");
const guild_member_module_1 = require("../guild-member/guild-member.module");
const guild_member_service_1 = require("../guild-member/guild-member.service");
const guild_gateway_1 = require("../guild/guild.gateway");
const guild_module_1 = require("../guild/guild.module");
const user_module_1 = require("../user/user.module");
const utility_module_1 = require("../utility/utility.module");
const role_gateway_1 = require("./role.gateway");
const role_service_1 = require("./role.service");
let RoleModule = class RoleModule {
};
RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            utility_module_1.UtilityModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => guild_module_1.GuildModule),
            (0, common_1.forwardRef)(() => channel_module_1.ChannelModule),
            (0, common_1.forwardRef)(() => channel_category_module_1.ChannelCategoryModule),
            guild_member_module_1.GuildMemberModule,
            typeorm_1.TypeOrmModule.forFeature([role_entity_1.RoleEntity]),
        ],
        providers: [guild_member_service_1.GuildMemberService, role_service_1.RoleService, role_gateway_1.RoleGateway, channel_gateway_1.ChannelGateway, guild_gateway_1.GuildGateway],
        exports: [typeorm_1.TypeOrmModule, role_service_1.RoleService],
    })
], RoleModule);
exports.RoleModule = RoleModule;
//# sourceMappingURL=role.module.js.map