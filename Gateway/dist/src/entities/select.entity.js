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
exports.SelectEntity = exports.SelectStyle = void 0;
const typeorm_1 = require("typeorm");
const action_entity_1 = require("./action.entity");
const option_entity_1 = require("./option.entity");
var SelectStyle;
(function (SelectStyle) {
    SelectStyle["PRIMARY"] = "primary";
    SelectStyle["SECONDARY"] = "secondary";
})(SelectStyle = exports.SelectStyle || (exports.SelectStyle = {}));
let SelectEntity = class SelectEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SelectEntity.prototype, "selectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], SelectEntity.prototype, "isDisabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], SelectEntity.prototype, "customId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: SelectStyle, default: SelectStyle.PRIMARY }),
    __metadata("design:type", String)
], SelectEntity.prototype, "style", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => action_entity_1.ActionEntity, type => type.selects),
    __metadata("design:type", action_entity_1.ActionEntity)
], SelectEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => option_entity_1.OptionEntity, type => type.select, { cascade: true }),
    __metadata("design:type", Array)
], SelectEntity.prototype, "options", void 0);
SelectEntity = __decorate([
    (0, typeorm_1.Entity)()
], SelectEntity);
exports.SelectEntity = SelectEntity;
//# sourceMappingURL=select.entity.js.map