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
const guild_entity_1 = require("../../../entities/guild.entity");
const auth_module_1 = require("../../auth-module/auth/auth.module");
const channel_category_module_1 = require("../channel-category/channel-category.module");
const channel_category_service_1 = require("../channel-category/channel-category.service");
const emoji_module_1 = require("../../message-module/emoji/emoji.module");
const emoji_service_1 = require("../../message-module/emoji/emoji.service");
const member_module_1 = require("../member/member.module");
const member_service_1 = require("../member/member.service");
const role_module_1 = require("../role/role.module");
const role_service_1 = require("../role/role.service");
const guild_gateway_1 = require("./guild.gateway");
const guild_service_1 = require("./guild.service");
let GuildModule = class GuildModule {
};
GuildModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([guild_entity_1.GuildEntity]),
            channel_category_module_1.ChannelCategoryModule,
            role_module_1.RoleModule,
            emoji_module_1.EmojiModule,
            member_module_1.MemberModule,
        ],
        providers: [
            emoji_service_1.EmojiService,
            member_service_1.MemberService,
            channel_category_service_1.ChannelCategoryService,
            role_service_1.RoleService,
            guild_service_1.GuildService,
            guild_gateway_1.GuildGateway,
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            guild_service_1.GuildService,
            channel_category_module_1.ChannelCategoryModule,
            role_module_1.RoleModule,
            emoji_module_1.EmojiModule,
            member_module_1.MemberModule,
        ],
    })
], GuildModule);
exports.GuildModule = GuildModule;
//# sourceMappingURL=guild.module.js.map