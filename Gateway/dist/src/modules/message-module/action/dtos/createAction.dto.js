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
exports.CreateActionDto = void 0
const class_transformer_1 = require('class-transformer')
const class_validator_1 = require('class-validator')
const dtos_1 = require('../../../../shared/dtos')
const createButton_dto_1 = require('../../button/dto/createButton.dto')
const createReact_dto_1 = require('../../react/dtos/createReact.dto')
class CreateActionDto {}
__decorate(
    [
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => dtos_1.MessageDto),
        __metadata('design:type', dtos_1.MessageDto),
    ],
    CreateActionDto.prototype,
    'message',
    void 0
)
__decorate(
    [
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_validator_1.IsArray)(),
        (0, class_transformer_1.Type)(() => createButton_dto_1.CreateButtonDto),
        __metadata('design:type', Array),
    ],
    CreateActionDto.prototype,
    'buttons',
    void 0
)
__decorate(
    [
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_validator_1.IsArray)(),
        (0, class_transformer_1.Type)(() => createReact_dto_1.CreateReactDto),
        __metadata('design:type', Array),
    ],
    CreateActionDto.prototype,
    'reacts',
    void 0
)
exports.CreateActionDto = CreateActionDto
//# sourceMappingURL=createAction.dto.js.map
