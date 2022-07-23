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
exports.CreateSelectDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const select_entity_1 = require("../../../../entities/select.entity");
const createOption_dto_1 = require("./createOption.dto");
class CreateSelectDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSelectDto.prototype, "customId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(select_entity_1.SelectStyle),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSelectDto.prototype, "style", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateSelectDto.prototype, "isDisabled", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => createOption_dto_1.CreateOptionDto),
    __metadata("design:type", Array)
], CreateSelectDto.prototype, "options", void 0);
exports.CreateSelectDto = CreateSelectDto;
//# sourceMappingURL=createSelect.dto.js.map