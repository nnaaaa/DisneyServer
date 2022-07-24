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
var ButtonGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const emit_1 = require("../../../shared/socket/emit");
const event_1 = require("../../../shared/socket/event");
const namespace_1 = require("../../../shared/socket/namespace");
const jwtWSUser_guard_1 = require("../../auth-module/auth/guards/jwtWSUser.guard");
const button_service_1 = require("./button.service");
const updateButton_dto_1 = require("./dto/updateButton.dto");
let ButtonGateway = ButtonGateway_1 = class ButtonGateway {
    constructor(buttonService) {
        this.buttonService = buttonService;
        this.logger = new common_1.Logger(ButtonGateway_1.name);
    }
    async click(buttonDto) {
        try {
            const button = await this.buttonService.findOneWithRelation(buttonDto);
            this.server.emit(`${button.action.actionId}/${namespace_1.SocketNamespace.BUTTON}/${emit_1.ButtonSocketEmit.CLICK}`, button);
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
], ButtonGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
    (0, websockets_1.SubscribeMessage)(event_1.ButtonSocketEvent.CLICK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateButton_dto_1.UpdateButtonDto]),
    __metadata("design:returntype", Promise)
], ButtonGateway.prototype, "click", null);
ButtonGateway = ButtonGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: namespace_1.SocketNamespace.BUTTON }),
    __metadata("design:paramtypes", [button_service_1.ButtonService])
], ButtonGateway);
exports.ButtonGateway = ButtonGateway;
//# sourceMappingURL=button.gateway.js.map