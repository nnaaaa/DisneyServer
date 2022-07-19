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
Object.defineProperty(exports, '__esModule', { value: true })
exports.ActionEntity = void 0
const typeorm_1 = require('typeorm')
const button_entity_1 = require('./button.entity')
const message_entity_1 = require('./message.entity')
const react_entity_1 = require('./react.entity')
let ActionEntity = class ActionEntity {}
__decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)('uuid'), __metadata('design:type', String)],
    ActionEntity.prototype,
    'actionId',
    void 0
)
__decorate(
    [
        (0, typeorm_1.OneToMany)(
            () => react_entity_1.ReactEntity,
            (type) => type.action,
            { cascade: true }
        ),
        __metadata('design:type', Array),
    ],
    ActionEntity.prototype,
    'reacts',
    void 0
)
__decorate(
    [
        (0, typeorm_1.OneToMany)(
            () => button_entity_1.ButtonEntity,
            (type) => type.action,
            { cascade: true }
        ),
        __metadata('design:type', Array),
    ],
    ActionEntity.prototype,
    'buttons',
    void 0
)
__decorate(
    [
        (0, typeorm_1.OneToOne)(
            () => message_entity_1.MessageEntity,
            (type) => type.action,
            { cascade: true }
        ),
        __metadata('design:type', message_entity_1.MessageEntity),
    ],
    ActionEntity.prototype,
    'message',
    void 0
)
ActionEntity = __decorate([(0, typeorm_1.Entity)()], ActionEntity)
exports.ActionEntity = ActionEntity
//# sourceMappingURL=action.entity.js.map
