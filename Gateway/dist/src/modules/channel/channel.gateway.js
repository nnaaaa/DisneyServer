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
exports.ChannelGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const socket_emit_1 = require("../../shared/socket.emit");
const socket_event_1 = require("../../shared/socket.event");
const jwtWS_guard_1 = require("../auth/guards/jwtWS.guard");
const channel_category_service_1 = require("../channel-category/channel-category.service");
const channel_service_1 = require("./channel.service");
const createChannel_dto_1 = require("./dtos/createChannel.dto");
const updateChannel_dto_1 = require("./dtos/updateChannel.dto");
let ChannelGateway = class ChannelGateway {
    constructor(channelService, channelCtgService) {
        this.channelService = channelService;
        this.channelCtgService = channelCtgService;
    }
    async create(createChannelDto, categoryId) {
        const category = await this.channelCtgService.findOneWithRelation({ categoryId });
        const channel = await this.channelService.create(createChannelDto, category);
        const savedChannel = await this.channelService.save(channel);
        this.server.emit(`${categoryId}/${socket_emit_1.ChannelSocketEmit.CREATE}`, savedChannel);
    }
    async update(updateChannelDto) {
        await this.channelService.updateOne({ channelId: updateChannelDto.channelId }, updateChannelDto);
        this.updateNotify(updateChannelDto);
    }
    async delete(channelId) {
        await this.channelService.delete({ channelId });
        this.server.emit(`${socket_emit_1.ChannelSocketEmit.DELETE}/${channelId}`);
    }
    channelMemberNotify(event, member) {
        for (const role of member.roles) {
            for (const channel of role.channels) {
                this.server.emit(`${event}/${channel.channelId}`, member);
            }
        }
        for (const channel of member.joinedChannels) {
            this.server.emit(`${event}/${channel.channelId}`, member);
        }
    }
    updateNotify(channel) {
        this.server.emit(`${socket_emit_1.ChannelSocketEmit.UPDATE}/${channel.channelId}`, channel);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChannelGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(socket_event_1.ChannelSocketEvent.CREATE),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)('channel')),
    __param(1, (0, websockets_1.MessageBody)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createChannel_dto_1.CreateChannelDto, String]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(socket_event_1.ChannelSocketEvent.UPDATE),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateChannel_dto_1.UpdateChannelDto]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(socket_event_1.ChannelSocketEvent.DELETE),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "delete", null);
ChannelGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: 'channel' }),
    __metadata("design:paramtypes", [channel_service_1.ChannelService,
        channel_category_service_1.ChannelCategoryService])
], ChannelGateway);
exports.ChannelGateway = ChannelGateway;
//# sourceMappingURL=channel.gateway.js.map