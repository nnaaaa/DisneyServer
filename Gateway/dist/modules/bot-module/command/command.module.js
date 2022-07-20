"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const command_entity_1 = require("../../../entities/command.entity");
const command_service_1 = require("./command.service");
const command_controller_1 = require("./command.controller");
let CommandModule = class CommandModule {
};
CommandModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([command_entity_1.CommandEntity])],
        providers: [command_service_1.CommandService],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [command_controller_1.CommandController],
    })
], CommandModule);
exports.CommandModule = CommandModule;
//# sourceMappingURL=command.module.js.map