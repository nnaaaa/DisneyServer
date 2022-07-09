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
exports.ArgumentEntity = void 0
const typeorm_1 = require('typeorm')
const command_entity_1 = require('./command.entity')
let ArgumentEntity = class ArgumentEntity {}
__decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)('uuid'), __metadata('design:type', String)],
    ArgumentEntity.prototype,
    'argId',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)(), __metadata('design:type', String)],
    ArgumentEntity.prototype,
    'name',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)(), __metadata('design:type', String)],
    ArgumentEntity.prototype,
    'value',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => command_entity_1.CommandEntity,
            (type) => type.args,
            { onDelete: 'CASCADE' }
        ),
        __metadata('design:type', command_entity_1.CommandEntity),
    ],
    ArgumentEntity.prototype,
    'command',
    void 0
)
ArgumentEntity = __decorate([(0, typeorm_1.Entity)()], ArgumentEntity)
exports.ArgumentEntity = ArgumentEntity
//# sourceMappingURL=argument.entity.js.map
