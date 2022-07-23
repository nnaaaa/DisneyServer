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
var ReactGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const emit_1 = require("../../../shared/socket/emit");
const event_1 = require("../../../shared/socket/event");
const namespace_1 = require("../../../shared/socket/namespace");
const createReact_dto_1 = require("./dtos/createReact.dto");
const react_service_1 = require("./react.service");
let ReactGateway = ReactGateway_1 = class ReactGateway {
    constructor(reactService) {
        this.reactService = reactService;
        this.logger = new common_1.Logger(ReactGateway_1.name);
    }
    async create(createReactDto) {
        try {
            const reactMessage = await this.reactService.reactToMessage(createReactDto);
            if (reactMessage.type === 'create') {
                this.server.emit(`${reactMessage.react.action.actionId}/${namespace_1.SocketNamespace.REACT}/${emit_1.ReactSocketEmit.CREATE}`, reactMessage.react);
            }
            else if (reactMessage.type === 'delete') {
                this.server.emit(`${reactMessage.react.action.actionId}/${namespace_1.SocketNamespace.REACT}/${emit_1.ReactSocketEmit.DELETE}`, reactMessage.react);
            }
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
], ReactGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.ReactSocketEvent.CREATE),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createReact_dto_1.CreateReactDto]),
    __metadata("design:returntype", Promise)
], ReactGateway.prototype, "create", null);
ReactGateway = ReactGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: namespace_1.SocketNamespace.REACT }),
    __metadata("design:paramtypes", [react_service_1.ReactService])
], ReactGateway);
exports.ReactGateway = ReactGateway;
//# sourceMappingURL=react.gateway.js.map