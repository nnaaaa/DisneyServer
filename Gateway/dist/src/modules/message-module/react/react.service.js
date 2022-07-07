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
exports.ReactService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const react_entity_1 = require('../../../entities/react.entity')
const react_repository_1 = require('../../../repositories/react.repository')
let ReactService = class ReactService {
    constructor(reactRepository) {
        this.reactRepository = reactRepository
        this.emojiRelations = {}
    }
    async save(react) {
        return await this.reactRepository.save(react)
    }
    create(react) {
        const newReact = this.reactRepository.create(react)
        return newReact
    }
    async findOneWithRelation(findCondition) {
        return await this.reactRepository.findOne({
            relations: this.emojiRelations,
            where: findCondition,
        })
    }
    async updateOne(reactId, emojiOfReactDto) {
        try {
            const react = await this.findOneWithRelation({ reactId })
            react.emoji = emojiOfReactDto
            return await this.save(react)
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteOne(findCondition) {
        try {
            await this.reactRepository.delete(findCondition)
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteMany(findCondition) {
        try {
            await this.reactRepository.delete(findCondition)
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async reactToMessage(emojiOfReactDto, messageOfReactDto, authorOfReactDto) {
        const react = this.create({
            author: authorOfReactDto,
            message: messageOfReactDto,
            emoji: emojiOfReactDto,
        })
        return await this.save(react)
    }
}
ReactService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(react_entity_1.ReactEntity)),
        __metadata('design:paramtypes', [react_repository_1.ReactRepository]),
    ],
    ReactService
)
exports.ReactService = ReactService
//# sourceMappingURL=react.service.js.map