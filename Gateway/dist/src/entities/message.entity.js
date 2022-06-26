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
var MesssageEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesssageEntity = void 0;
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("./channel.entity");
const user_entity_1 = require("./user.entity");
let MesssageEntity = MesssageEntity_1 = class MesssageEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MesssageEntity.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MesssageEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], MesssageEntity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MesssageEntity.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MesssageEntity.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channel_entity_1.ChannelEntity, (type) => type.messages, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", channel_entity_1.ChannelEntity)
], MesssageEntity.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (type) => type.sentMessages, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], MesssageEntity.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => MesssageEntity_1, { cascade: true }),
    __metadata("design:type", MesssageEntity)
], MesssageEntity.prototype, "replyTo", void 0);
MesssageEntity = MesssageEntity_1 = __decorate([
    (0, typeorm_1.Entity)()
], MesssageEntity);
exports.MesssageEntity = MesssageEntity;
//# sourceMappingURL=message.entity.js.map