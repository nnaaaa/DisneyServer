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
exports.ArgumentService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const argument_entity_1 = require('../../../entities/argument.entity')
const argument_repository_1 = require('../../../repositories/argument.repository')
let ArgumentService = class ArgumentService {
    constructor(argumentRepository) {
        this.argumentRepository = argumentRepository
    }
    async save(Argument) {
        return this.argumentRepository.save(Argument)
    }
    async create(createArgumentDto) {
        const argument = this.argumentRepository.create(createArgumentDto)
        return argument
    }
    async updateOne(findCondition, updateCondition) {
        try {
            let argument = await this.findOne(findCondition)
            argument = Object.assign(argument, updateCondition)
            return await this.save(argument)
        } catch (e) {
            throw new common_1.InternalServerErrorException()
        }
    }
    async deleteOne(findCondition) {
        try {
            let Argument = await this.findOne(findCondition)
            return await this.argumentRepository.remove(Argument)
        } catch (e) {
            throw new common_1.InternalServerErrorException()
        }
    }
    async findOne(findCondition) {
        return await this.argumentRepository.findOne({
            where: findCondition,
        })
    }
}
ArgumentService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(argument_entity_1.ArgumentEntity)),
        __metadata('design:paramtypes', [argument_repository_1.ArgumentRepository]),
    ],
    ArgumentService
)
exports.ArgumentService = ArgumentService
//# sourceMappingURL=argument.service.js.map
