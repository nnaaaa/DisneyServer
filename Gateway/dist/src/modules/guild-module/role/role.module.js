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
const role_entity_1 = require("../../../entities/role.entity");
const auth_module_1 = require("../../auth-module/auth/auth.module");
const channel_module_1 = require("../channel/channel.module");
const channel_service_1 = require("../channel/channel.service");
const member_module_1 = require("../member/member.module");
const role_gateway_1 = require("./role.gateway");
const role_service_1 = require("./role.service");
let RoleModule = class RoleModule {
};
RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([role_entity_1.RoleEntity]),
            channel_module_1.ChannelModule,
            member_module_1.MemberModule
        ],
        providers: [channel_service_1.ChannelService, member_module_1.MemberModule, role_service_1.RoleService, role_gateway_1.RoleGateway],
        exports: [typeorm_1.TypeOrmModule, role_service_1.RoleService],
    })
], RoleModule);
exports.RoleModule = RoleModule;
//# sourceMappingURL=role.module.js.map