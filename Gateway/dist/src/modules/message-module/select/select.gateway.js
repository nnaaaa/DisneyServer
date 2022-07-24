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
var SelectGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwtWSUser_guard_1 = require("../../auth-module/auth/guards/jwtWSUser.guard");
const emit_1 = require("../../../shared/socket/emit");
const event_1 = require("../../../shared/socket/event");
const namespace_1 = require("../../../shared/socket/namespace");
const updateOption_dto_1 = require("./dtos/updateOption.dto");
const select_service_1 = require("./select.service");
let SelectGateway = SelectGateway_1 = class SelectGateway {
    constructor(selectService) {
        this.selectService = selectService;
        this.logger = new common_1.Logger(SelectGateway_1.name);
    }
    async select(optionDto) {
        try {
            const option = await this.selectService.findOneWithRelation(optionDto);
            this.server.emit(`${option.select.action.actionId}/${namespace_1.SocketNamespace.SELECT}/${emit_1.SelectSocketEmit.SELECT}`, option);
        }
        catch (e) {
            this.logger.error(e);
            return e;
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SelectGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
    (0, websockets_1.SubscribeMessage)(event_1.SelectSocketEvent.SELECT),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateOption_dto_1.UpdateOptionDto]),
    __metadata("design:returntype", Promise)
], SelectGateway.prototype, "select", null);
SelectGateway = SelectGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: namespace_1.SocketNamespace.SELECT }),
    __metadata("design:paramtypes", [select_service_1.SelectService])
], SelectGateway);
exports.SelectGateway = SelectGateway;
//# sourceMappingURL=select.gateway.js.map