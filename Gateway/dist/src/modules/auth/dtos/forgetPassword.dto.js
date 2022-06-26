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
exports.NewPasswordWithComparationDto = exports.NewPassordWithSMSDto = exports.NewPasswordDto = exports.ForgetPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ForgetPasswordDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Account',
        example: 'example@gamil.com',
        required: true,
    }),
    __metadata("design:type", String)
], ForgetPasswordDto.prototype, "account", void 0);
exports.ForgetPasswordDto = ForgetPasswordDto;
class NewPasswordDto extends ForgetPasswordDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'New Password',
        example: 'newPassword',
        required: true,
    }),
    __metadata("design:type", String)
], NewPasswordDto.prototype, "newPassword", void 0);
exports.NewPasswordDto = NewPasswordDto;
class NewPassordWithSMSDto extends NewPasswordDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Digit Code',
        example: '123456',
        required: true,
    }),
    __metadata("design:type", Number)
], NewPassordWithSMSDto.prototype, "digitCode", void 0);
exports.NewPassordWithSMSDto = NewPassordWithSMSDto;
class NewPasswordWithComparationDto extends NewPasswordDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Old Password',
        example: 'oldPassword',
        required: true,
    }),
    __metadata("design:type", String)
], NewPasswordWithComparationDto.prototype, "oldPassword", void 0);
exports.NewPasswordWithComparationDto = NewPasswordWithComparationDto;
//# sourceMappingURL=forgetPassword.dto.js.map