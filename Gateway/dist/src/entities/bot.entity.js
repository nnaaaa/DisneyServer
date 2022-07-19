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
exports.BotEntity = void 0
const constant_1 = require('../shared/utils/constant')
const typeorm_1 = require('typeorm')
const command_entity_1 = require('./command.entity')
const member_entity_1 = require('./member.entity')
const user_entity_1 = require('./user.entity')
let BotEntity = class BotEntity {}
__decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)('uuid'), __metadata('design:type', String)],
    BotEntity.prototype,
    'botId',
    void 0
)
__decorate(
    [
        (0, typeorm_1.Column)({ default: constant_1.Constant.botAvatar }),
        __metadata('design:type', String),
    ],
    BotEntity.prototype,
    'avatarUrl',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)({ unique: true }), __metadata('design:type', String)],
    BotEntity.prototype,
    'name',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)({ type: 'text' }), __metadata('design:type', String)],
    BotEntity.prototype,
    'description',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)(), __metadata('design:type', String)],
    BotEntity.prototype,
    'secretKey',
    void 0
)
__decorate(
    [
        (0, typeorm_1.Column)({ default: false, type: 'bool' }),
        __metadata('design:type', Boolean),
    ],
    BotEntity.prototype,
    'isListening',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => user_entity_1.UserEntity,
            (type) => type.createdBots
        ),
        __metadata('design:type', user_entity_1.UserEntity),
    ],
    BotEntity.prototype,
    'author',
    void 0
)
__decorate(
    [
        (0, typeorm_1.OneToMany)(
            () => member_entity_1.MemberEntity,
            (type) => type.bot,
            { cascade: true }
        ),
        __metadata('design:type', Array),
    ],
    BotEntity.prototype,
    'joinedGuilds',
    void 0
)
__decorate(
    [
        (0, typeorm_1.OneToMany)(
            () => command_entity_1.CommandEntity,
            (type) => type.bot,
            { cascade: true }
        ),
        __metadata('design:type', Array),
    ],
    BotEntity.prototype,
    'commands',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)({ type: 'simple-array' }), __metadata('design:type', Array)],
    BotEntity.prototype,
    'requiredPermissions',
    void 0
)
BotEntity = __decorate([(0, typeorm_1.Entity)()], BotEntity)
exports.BotEntity = BotEntity
//# sourceMappingURL=bot.entity.js.map
