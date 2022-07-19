'use strict'
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
            d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v)
    }
var MessageEntity_1
Object.defineProperty(exports, '__esModule', { value: true })
exports.MessageEntity = void 0
const typeorm_1 = require('typeorm')
const action_entity_1 = require('./action.entity')
const channel_entity_1 = require('./channel.entity')
const member_entity_1 = require('./member.entity')
let MessageEntity = (MessageEntity_1 = class MessageEntity {})
__decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)('uuid'), __metadata('design:type', String)],
    MessageEntity.prototype,
    'messageId',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)({ type: 'text' }), __metadata('design:type', String)],
    MessageEntity.prototype,
    'content',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)({ type: 'simple-array' }), __metadata('design:type', Array)],
    MessageEntity.prototype,
    'images',
    void 0
)
__decorate(
    [(0, typeorm_1.CreateDateColumn)(), __metadata('design:type', Date)],
    MessageEntity.prototype,
    'createdAt',
    void 0
)
__decorate(
    [
        (0, typeorm_1.OneToOne)(
            () => action_entity_1.ActionEntity,
            (type) => type.message
        ),
        (0, typeorm_1.JoinColumn)(),
        __metadata('design:type', action_entity_1.ActionEntity),
    ],
    MessageEntity.prototype,
    'action',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => channel_entity_1.ChannelEntity,
            (type) => type.messages
        ),
        __metadata('design:type', channel_entity_1.ChannelEntity),
    ],
    MessageEntity.prototype,
    'channel',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => member_entity_1.MemberEntity,
            (type) => type.sentMessages
        ),
        __metadata('design:type', member_entity_1.MemberEntity),
    ],
    MessageEntity.prototype,
    'author',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => MessageEntity_1,
            (type) => type.replies,
            { nullable: true }
        ),
        __metadata('design:type', MessageEntity),
    ],
    MessageEntity.prototype,
    'replyTo',
    void 0
)
__decorate(
    [
        (0, typeorm_1.OneToMany)(
            () => MessageEntity_1,
            (type) => type.replyTo,
            { cascade: true }
        ),
        __metadata('design:type', Array),
    ],
    MessageEntity.prototype,
    'replies',
    void 0
)
MessageEntity = MessageEntity_1 = __decorate([(0, typeorm_1.Entity)()], MessageEntity)
exports.MessageEntity = MessageEntity
//# sourceMappingURL=message.entity.js.map
