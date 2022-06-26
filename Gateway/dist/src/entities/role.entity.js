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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEntity = void 0;
const guild_default_1 = require("../shared/guild.default");
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("./channel.entity");
const guild_entity_1 = require("./guild.entity");
const guildMember_entity_1 = require("./guildMember.entity");
let RoleEntity = class RoleEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoleEntity.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RoleEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: guild_default_1.GuildDefault.roleColor }),
    __metadata("design:type", String)
], RoleEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => guild_entity_1.GuildEntity, (type) => type.roles),
    __metadata("design:type", guild_entity_1.GuildEntity)
], RoleEntity.prototype, "guild", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => guildMember_entity_1.GuildMemberEntity, (type) => type.roles),
    __metadata("design:type", Array)
], RoleEntity.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => channel_entity_1.ChannelEntity, (type) => type.roles),
    __metadata("design:type", Array)
], RoleEntity.prototype, "channels", void 0);
RoleEntity = __decorate([
    (0, typeorm_1.Entity)()
], RoleEntity);
exports.RoleEntity = RoleEntity;
//# sourceMappingURL=role.entity.js.map