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
exports.ButtonEntity = exports.ButtonStyle = void 0;
const typeorm_1 = require("typeorm");
const action_entity_1 = require("./action.entity");
var ButtonStyle;
(function (ButtonStyle) {
    ButtonStyle["PRIMARY"] = "primary";
    ButtonStyle["SECONDARY"] = "secondary";
    ButtonStyle["SUCCESS"] = "success";
    ButtonStyle["WARNING"] = "warning";
    ButtonStyle["ERROR"] = "error";
})(ButtonStyle = exports.ButtonStyle || (exports.ButtonStyle = {}));
let ButtonEntity = class ButtonEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ButtonEntity.prototype, "buttonId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ButtonEntity.prototype, "customId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ButtonEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], ButtonEntity.prototype, "isDisabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ButtonStyle, default: ButtonStyle.PRIMARY }),
    __metadata("design:type", String)
], ButtonEntity.prototype, "style", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => action_entity_1.ActionEntity, (react) => react.buttons),
    __metadata("design:type", action_entity_1.ActionEntity)
], ButtonEntity.prototype, "action", void 0);
ButtonEntity = __decorate([
    (0, typeorm_1.Entity)()
], ButtonEntity);
exports.ButtonEntity = ButtonEntity;
//# sourceMappingURL=button.entity.js.map