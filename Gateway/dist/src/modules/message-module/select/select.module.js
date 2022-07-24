"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectModule = void 0;
const common_1 = require("@nestjs/common");
const select_service_1 = require("./select.service");
const select_gateway_1 = require("./select.gateway");
const typeorm_1 = require("@nestjs/typeorm");
const select_entity_1 = require("../../../entities/select.entity");
const option_entity_1 = require("../../../entities/option.entity");
const auth_module_1 = require("../../auth-module/auth/auth.module");
let SelectModule = class SelectModule {
};
SelectModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([select_entity_1.SelectEntity, option_entity_1.OptionEntity]), auth_module_1.AuthModule],
        providers: [select_service_1.SelectService, select_gateway_1.SelectGateway],
        exports: [typeorm_1.TypeOrmModule, select_service_1.SelectService],
    })
], SelectModule);
exports.SelectModule = SelectModule;
//# sourceMappingURL=select.module.js.map