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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const command_service_1 = require("./command.service");
const createCommand_dto_1 = require("./dtos/createCommand.dto");
const updateCommand_dto_1 = require("./dtos/updateCommand.dto");
let CommandController = class CommandController {
    constructor(commandService) {
        this.commandService = commandService;
    }
    async execute(botId, createCommandDto) {
        const command = await this.commandService.create(Object.assign(Object.assign({}, createCommandDto), { bot: { botId } }));
        const savedCommand = await this.commandService.save(command);
        return savedCommand;
    }
    async update(commandId, updateCommandDto) {
        const command = await this.commandService.updateOne({ commandId }, updateCommandDto);
        return command;
    }
    async delete(commandId) {
        const command = await this.commandService.deleteOne({ commandId });
        return command;
    }
};
__decorate([
    (0, common_1.Post)('/:botId'),
    __param(0, (0, common_1.Param)('botId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createCommand_dto_1.CreateCommandDto]),
    __metadata("design:returntype", Promise)
], CommandController.prototype, "execute", null);
__decorate([
    (0, common_1.Put)('/:commandId'),
    __param(0, (0, common_1.Param)('commandId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateCommand_dto_1.UpdateCommandDto]),
    __metadata("design:returntype", Promise)
], CommandController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:commandId'),
    __param(0, (0, common_1.Param)('commandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommandController.prototype, "delete", null);
CommandController = __decorate([
    (0, swagger_1.ApiTags)('command'),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('command'),
    __metadata("design:paramtypes", [command_service_1.CommandService])
], CommandController);
exports.CommandController = CommandController;
//# sourceMappingURL=command.controller.js.map