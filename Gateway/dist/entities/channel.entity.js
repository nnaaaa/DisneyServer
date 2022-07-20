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
exports.ChannelEntity = void 0;
const typeorm_1 = require("typeorm");
const channelCategory_entity_1 = require("./channelCategory.entity");
const member_entity_1 = require("./member.entity");
const message_entity_1 = require("./message.entity");
const role_entity_1 = require("./role.entity");
let ChannelEntity = class ChannelEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChannelEntity.prototype, "channelId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChannelEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, type: 'bool' }),
    __metadata("design:type", Boolean)
], ChannelEntity.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, (type) => type.channel, { cascade: true }),
    __metadata("design:type", Array)
], ChannelEntity.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => member_entity_1.MemberEntity, (type) => type.joinedChannels, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ChannelEntity.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channelCategory_entity_1.ChannelCategoryEntity, (type) => type.channels),
    __metadata("design:type", channelCategory_entity_1.ChannelCategoryEntity)
], ChannelEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.RoleEntity, (type) => type.channels, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ChannelEntity.prototype, "roles", void 0);
ChannelEntity = __decorate([
    (0, typeorm_1.Entity)()
], ChannelEntity);
exports.ChannelEntity = ChannelEntity;
//# sourceMappingURL=channel.entity.js.map