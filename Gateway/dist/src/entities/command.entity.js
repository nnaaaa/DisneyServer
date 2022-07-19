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
exports.CommandEntity = void 0
const typeorm_1 = require('typeorm')
const bot_entity_1 = require('./bot.entity')
let CommandEntity = class CommandEntity {}
__decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)('uuid'), __metadata('design:type', String)],
    CommandEntity.prototype,
    'commandId',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)(), __metadata('design:type', String)],
    CommandEntity.prototype,
    'name',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)({ type: 'text' }), __metadata('design:type', String)],
    CommandEntity.prototype,
    'description',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => bot_entity_1.BotEntity,
            (type) => type.commands,
            { onDelete: 'CASCADE' }
        ),
        __metadata('design:type', bot_entity_1.BotEntity),
    ],
    CommandEntity.prototype,
    'bot',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)({ type: 'simple-array' }), __metadata('design:type', Array)],
    CommandEntity.prototype,
    'args',
    void 0
)
CommandEntity = __decorate([(0, typeorm_1.Entity)()], CommandEntity)
exports.CommandEntity = CommandEntity
//# sourceMappingURL=command.entity.js.map
