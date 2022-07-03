"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildPermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const member_service_1 = require("../../modules/guild-module/member/member.service");
let GuildPermissionGuard = class GuildPermissionGuard {
    constructor(reflector, memberService) {
        this.reflector = reflector;
        this.memberService = memberService;
    }
    async canActivate(context) {
        const data = context.switchToWs().getData();
        if (!data.memberId)
            return false;
        const requiredPermissions = this.reflector.get('permissions', context.getHandler());
        if (!requiredPermissions)
            return true;
        const member = await this.memberService.findOneWithRelation({ memberId: data.memberId });
        const isAdmitted = requiredPermissions.every(permission => member.roles.some(role => role.permissions.includes(permission)));
        delete data.memberId;
        return isAdmitted;
    }
};
GuildPermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(member_service_1.MemberService)),
    __metadata("design:paramtypes", [core_1.Reflector,
        member_service_1.MemberService])
], GuildPermissionGuard);
exports.GuildPermissionGuard = GuildPermissionGuard;
//# sourceMappingURL=permission.guard.js.map