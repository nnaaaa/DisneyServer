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
exports.BotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bot_entity_1 = require("../../../entities/bot.entity");
const user_entity_1 = require("../../../entities/user.entity");
const auth_service_1 = require("../../auth-module/auth/auth.service");
const jwtBot_guard_1 = require("../../auth-module/auth/guards/jwtBot.guard");
const jwtUser_guard_1 = require("../../auth-module/auth/guards/jwtUser.guard");
const auth_user_decorator_1 = require("../../../shared/decorators/auth-user.decorator");
const bot_service_1 = require("./bot.service");
const createBot_dto_1 = require("./dtos/createBot.dto");
const genSecretKey_dto_1 = require("./dtos/genSecretKey.dto");
const updateBot_dto_1 = require("./dtos/updateBot.dto");
let BotController = class BotController {
    constructor(botService, authService) {
        this.botService = botService;
        this.authService = authService;
    }
    getOne(bot) {
        return this.botService.updateOne({ botId: bot.botId }, { isListening: true });
    }
    getFromAuthor({ userId }) {
        return this.botService.findManyWithRelation({ author: { userId } });
    }
    getAll() {
        return this.botService.findManyWithRelation({});
    }
    async generateSecretKey(genSecretKeyDto) {
        const key = await this.botService.genSecretKey(genSecretKeyDto);
        return key;
    }
    async create(createBotDto, user) {
        const bot = await this.botService.create(createBotDto);
        bot.author = user;
        const savedBot = await this.botService.save(bot);
        return savedBot;
    }
    async update(updateBotDto) {
        const bot = await this.botService.updateOne({ botId: updateBotDto.botId }, updateBotDto);
        return bot;
    }
    async delete(botId, { userId }) {
        const bot = await this.botService.deleteOne({ botId, author: { userId } });
        return bot;
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwtBot_guard_1.JwtBotGuard),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bot_entity_1.BotEntity]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/fromAuthor'),
    (0, common_1.UseGuards)(jwtUser_guard_1.JwtUserGuard),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "getFromAuthor", null);
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.UseGuards)(jwtUser_guard_1.JwtUserGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BotController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/genSecretKey'),
    (0, common_1.UseGuards)(jwtUser_guard_1.JwtUserGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [genSecretKey_dto_1.GenSecretKeyDto]),
    __metadata("design:returntype", Promise)
], BotController.prototype, "generateSecretKey", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwtUser_guard_1.JwtUserGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBot_dto_1.CreateBotDto, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], BotController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(jwtUser_guard_1.JwtUserGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBot_dto_1.UpdateBotDto]),
    __metadata("design:returntype", Promise)
], BotController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(jwtUser_guard_1.JwtUserGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], BotController.prototype, "delete", null);
BotController = __decorate([
    (0, swagger_1.ApiTags)('bot'),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('bot'),
    __metadata("design:paramtypes", [bot_service_1.BotService, auth_service_1.AuthService])
], BotController);
exports.BotController = BotController;
//# sourceMappingURL=bot.controller.js.map