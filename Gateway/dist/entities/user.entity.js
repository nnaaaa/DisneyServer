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
exports.UserEntity = void 0;
const constant_1 = require("../shared/utils/constant");
const typeorm_1 = require("typeorm");
const bot_entity_1 = require("./bot.entity");
const member_entity_1 = require("./member.entity");
const userBeFriend_entity_1 = require("./userBeFriend.entity");
let UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: constant_1.Constant.userAvatar }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, type: 'bool' }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isOnline", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true, select: false }),
    __metadata("design:type", Number)
], UserEntity.prototype, "registerVerifyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true, select: false }),
    __metadata("design:type", Number)
], UserEntity.prototype, "changePwdVerfiyCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userBeFriend_entity_1.UserBeFriendEntity, (beFriend) => beFriend.leftUser || beFriend.rightUser, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => member_entity_1.MemberEntity, (type) => type.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "joinedGuilds", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bot_entity_1.BotEntity, (type) => type.author, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "createdBots", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map