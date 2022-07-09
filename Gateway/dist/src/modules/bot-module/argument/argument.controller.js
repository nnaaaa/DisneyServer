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
var __param =
    (this && this.__param) ||
    function (paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex)
        }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ArgumentController = void 0
const common_1 = require('@nestjs/common')
const argument_service_1 = require('./argument.service')
const createArg_dto_1 = require('./dtos/createArg.dto')
let ArgumentController = class ArgumentController {
    constructor(argumentService) {
        this.argumentService = argumentService
    }
    async execute(commandId, createArgumentDto) {
        const argument = await this.argumentService.create(
            Object.assign(Object.assign({}, createArgumentDto), {
                command: { commandId },
            })
        )
        const savedArgument = await this.argumentService.save(argument)
        return savedArgument
    }
    async update(argId, updateArgumentDto) {
        const argument = await this.argumentService.updateOne(
            { argId },
            updateArgumentDto
        )
        return argument
    }
    async delete(argId) {
        const argument = await this.argumentService.deleteOne({ argId })
        return argument
    }
}
__decorate(
    [
        (0, common_1.Post)('/:commandId'),
        __param(0, (0, common_1.Param)('commandId')),
        __param(1, (0, common_1.Body)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String, createArg_dto_1.CreateArgDto]),
        __metadata('design:returntype', Promise),
    ],
    ArgumentController.prototype,
    'execute',
    null
)
__decorate(
    [
        (0, common_1.Put)('/:argId'),
        __param(0, (0, common_1.Param)('argId')),
        __param(1, (0, common_1.Body)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String, createArg_dto_1.CreateArgDto]),
        __metadata('design:returntype', Promise),
    ],
    ArgumentController.prototype,
    'update',
    null
)
__decorate(
    [
        (0, common_1.Delete)('/:argId'),
        __param(0, (0, common_1.Param)('argId')),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String]),
        __metadata('design:returntype', Promise),
    ],
    ArgumentController.prototype,
    'delete',
    null
)
ArgumentController = __decorate(
    [
        (0, common_1.Controller)('argument'),
        __metadata('design:paramtypes', [argument_service_1.ArgumentService]),
    ],
    ArgumentController
)
exports.ArgumentController = ArgumentController
//# sourceMappingURL=argument.controller.js.map
