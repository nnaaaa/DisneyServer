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
exports.CommandService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const command_entity_1 = require('../../../entities/command.entity')
const command_repository_1 = require('../../../repositories/command.repository')
let CommandService = class CommandService {
    constructor(commandRepository) {
        this.commandRepository = commandRepository
    }
    async save(command) {
        return this.commandRepository.save(command)
    }
    async create(createCommandDto) {
        const isExistCommand = await this.findOne({ name: createCommandDto.name })
        if (isExistCommand) {
            throw new common_1.ConflictException()
        }
        const command = this.commandRepository.create(
            Object.assign({ args: [] }, createCommandDto)
        )
        return command
    }
    async updateOne(findCondition, updateCondition) {
        try {
            let command = await this.findOne(findCondition)
            const isExistCommand = await this.findOne({ name: updateCondition.name })
            if (isExistCommand && isExistCommand.commandId !== command.commandId) {
                throw new common_1.ConflictException()
            }
            command = Object.assign(command, updateCondition)
            return await this.save(command)
        } catch (e) {
            throw new common_1.InternalServerErrorException()
        }
    }
    async deleteOne(findCondition) {
        try {
            let command = await this.findOne(findCondition)
            return await this.commandRepository.remove(command)
        } catch (e) {
            throw new common_1.InternalServerErrorException()
        }
    }
    async findOne(findCondition) {
        return await this.commandRepository.findOne({
            where: findCondition,
        })
    }
}
CommandService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(command_entity_1.CommandEntity)),
        __metadata('design:paramtypes', [command_repository_1.CommandRepository]),
    ],
    CommandService
)
exports.CommandService = CommandService
//# sourceMappingURL=command.service.js.map
