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
exports.ReactEntity = void 0
const typeorm_1 = require('typeorm')
const action_entity_1 = require('./action.entity')
const emoji_entity_1 = require('./emoji.entity')
const member_entity_1 = require('./member.entity')
let ReactEntity = class ReactEntity {}
__decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)('uuid'), __metadata('design:type', String)],
    ReactEntity.prototype,
    'reactId',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => member_entity_1.MemberEntity,
            (type) => type.sentReacts
        ),
        __metadata('design:type', member_entity_1.MemberEntity),
    ],
    ReactEntity.prototype,
    'author',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => action_entity_1.ActionEntity,
            (type) => type.reacts
        ),
        __metadata('design:type', action_entity_1.ActionEntity),
    ],
    ReactEntity.prototype,
    'action',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => emoji_entity_1.EmojiEntity,
            (type) => type.reacts
        ),
        __metadata('design:type', emoji_entity_1.EmojiEntity),
    ],
    ReactEntity.prototype,
    'emoji',
    void 0
)
ReactEntity = __decorate([(0, typeorm_1.Entity)()], ReactEntity)
exports.ReactEntity = ReactEntity
//# sourceMappingURL=react.entity.js.map
