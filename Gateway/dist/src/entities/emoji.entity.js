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
exports.EmojiEntity = void 0;
const typeorm_1 = require("typeorm");
const guild_entity_1 = require("./guild.entity");
const react_entity_1 = require("./react.entity");
let EmojiEntity = class EmojiEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmojiEntity.prototype, "emojiId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmojiEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmojiEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => guild_entity_1.GuildEntity, (type) => type.emojis),
    __metadata("design:type", guild_entity_1.GuildEntity)
], EmojiEntity.prototype, "guild", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => react_entity_1.ReactEntity, (react) => react.emoji, { cascade: true }),
    __metadata("design:type", Array)
], EmojiEntity.prototype, "reacts", void 0);
EmojiEntity = __decorate([
    (0, typeorm_1.Entity)()
], EmojiEntity);
exports.EmojiEntity = EmojiEntity;
//# sourceMappingURL=emoji.entity.js.map