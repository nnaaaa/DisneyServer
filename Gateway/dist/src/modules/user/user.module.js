"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userBeFriend_entity_1 = require("../../entities/userBeFriend.entity");
const user_entity_1 = require("../../entities/user.entity");
const channel_category_module_1 = require("../channel-category/channel-category.module");
const channel_gateway_1 = require("../channel/channel.gateway");
const channel_module_1 = require("../channel/channel.module");
const guild_member_module_1 = require("../guild-member/guild-member.module");
const guild_member_service_1 = require("../guild-member/guild-member.service");
const utility_module_1 = require("../utility/utility.module");
const user_controller_1 = require("./user.controller");
const user_gateway_1 = require("./user.gateway");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            utility_module_1.UtilityModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, userBeFriend_entity_1.UserBeFriendEntity]),
            guild_member_module_1.GuildMemberModule,
            (0, common_1.forwardRef)(() => channel_category_module_1.ChannelCategoryModule),
            (0, common_1.forwardRef)(() => channel_module_1.ChannelModule),
        ],
        providers: [guild_member_service_1.GuildMemberService, user_service_1.UserService, user_gateway_1.UserGateway, channel_gateway_1.ChannelGateway],
        controllers: [user_controller_1.UserController],
        exports: [typeorm_1.TypeOrmModule, user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map