'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MessageController = void 0;
const common_1 = require('@nestjs/common');
const microservices_1 = require('@nestjs/microservices');
const event_pattern_1 = require('../../shared/event.pattern');
const createMessage_dto_1 = require('./dtos/createMessage.dto');
const updateMessage_dto_1 = require('./dtos/updateMessage.dto');
const message_service_1 = require('./message.service');
let MessageController = class MessageController {
  constructor(messageService) {
    this.messageService = messageService;
  }
  async create(createMessageDto) {
    return await this.messageService.create(createMessageDto);
  }
  async update(userUpdateDto) {
    const message = await this.messageService.updateOne(userUpdateDto);
    return message;
  }
  async delete(_id) {
    await this.messageService.deleteOne(_id);
  }
};
__decorate(
  [
    (0, microservices_1.MessagePattern)(
      event_pattern_1.MessagePatternEvent.CREATE,
    ),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, microservices_1.Payload)('value')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [createMessage_dto_1.CreateMessageDto]),
    __metadata('design:returntype', Promise),
  ],
  MessageController.prototype,
  'create',
  null,
);
__decorate(
  [
    (0, microservices_1.MessagePattern)(
      event_pattern_1.MessagePatternEvent.UPDATE,
    ),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, microservices_1.Payload)('value')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [updateMessage_dto_1.UpdateMessageDto]),
    __metadata('design:returntype', Promise),
  ],
  MessageController.prototype,
  'update',
  null,
);
__decorate(
  [
    (0, microservices_1.EventPattern)(
      event_pattern_1.MessagePatternEvent.DELETE,
    ),
    __param(0, (0, microservices_1.Payload)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  MessageController.prototype,
  'delete',
  null,
);
MessageController = __decorate(
  [
    (0, common_1.Controller)(),
    __metadata('design:paramtypes', [message_service_1.MessageService]),
  ],
  MessageController,
);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map
