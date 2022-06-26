"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMemberModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const guildMember_entity_1 = require("../../entities/guildMember.entity");
const guild_member_service_1 = require("./guild-member.service");
let GuildMemberModule = class GuildMemberModule {
};
GuildMemberModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([guildMember_entity_1.GuildMemberEntity])],
        providers: [guild_member_service_1.GuildMemberService],
        exports: [typeorm_1.TypeOrmModule, guild_member_service_1.GuildMemberService],
    })
], GuildMemberModule);
exports.GuildMemberModule = GuildMemberModule;
//# sourceMappingURL=guild-member.module.js.map