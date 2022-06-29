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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_model_1 = require("../../models/message.model");
const user_service_1 = require("../user/user.service");
let MessageService = class MessageService {
    constructor(messageModel, userService) {
        this.messageModel = messageModel;
        this.userService = userService;
    }
    async create(createMessageDto) {
        const user = await this.userService.findOne(createMessageDto.userId);
        if (!user)
            throw new microservices_1.RpcException(new common_1.NotFoundException());
        const message = new this.messageModel(createMessageDto);
        message.author = user;
        return await message.save();
    }
    async updateOne(updateMessageDto) {
        const message = await this.messageModel.findByIdAndUpdate(updateMessageDto._id);
        return message;
    }
    async deleteOne(_id) {
        await this.messageModel.findByIdAndDelete(_id);
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_model_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map