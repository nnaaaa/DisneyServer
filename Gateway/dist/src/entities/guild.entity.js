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
exports.GuildEntity = void 0;
const default_1 = require("../shared/default");
const typeorm_1 = require("typeorm");
const channelCategory_entity_1 = require("./channelCategory.entity");
const role_entity_1 = require("./role.entity");
const guildMember_entity_1 = require("./guildMember.entity");
let GuildEntity = class GuildEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GuildEntity.prototype, "guildId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GuildEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: default_1.Default.guildAvatar }),
    __metadata("design:type", String)
], GuildEntity.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => guildMember_entity_1.GuildMemberEntity, (type) => type.guild, { cascade: true }),
    __metadata("design:type", Array)
], GuildEntity.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => role_entity_1.RoleEntity, (type) => type.guild, { cascade: true }),
    __metadata("design:type", Array)
], GuildEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => channelCategory_entity_1.ChannelCategoryEntity, (type) => type.guild, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], GuildEntity.prototype, "categories", void 0);
GuildEntity = __decorate([
    (0, typeorm_1.Entity)()
], GuildEntity);
exports.GuildEntity = GuildEntity;
//# sourceMappingURL=guild.entity.js.map