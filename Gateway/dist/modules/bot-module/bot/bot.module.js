"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bot_entity_1 = require("../../../entities/bot.entity");
const auth_module_1 = require("../../auth-module/auth/auth.module");
const auth_service_1 = require("../../auth-module/auth/auth.service");
const bot_controller_1 = require("./bot.controller");
const bot_service_1 = require("./bot.service");
let BotModule = class BotModule {
};
BotModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => auth_module_1.AuthModule), typeorm_1.TypeOrmModule.forFeature([bot_entity_1.BotEntity])],
        providers: [auth_service_1.AuthService, bot_service_1.BotService],
        controllers: [bot_controller_1.BotController],
        exports: [typeorm_1.TypeOrmModule, bot_service_1.BotService],
    })
], BotModule);
exports.BotModule = BotModule;
//# sourceMappingURL=bot.module.js.map