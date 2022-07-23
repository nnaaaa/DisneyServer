"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const action_entity_1 = require("../../../entities/action.entity");
const action_repository_1 = require("../../../repositories/action.repository");
const button_service_1 = require("../button/button.service");
const react_service_1 = require("../react/react.service");
let ActionService = class ActionService {
    constructor(actionRepository, reactService, buttonService) {
        this.actionRepository = actionRepository;
        this.reactService = reactService;
        this.buttonService = buttonService;
        this.actionRelations = {
            buttons: true,
            reacts: true,
            selects: true
        };
    }
    async save(action) {
        return await this.actionRepository.save(action);
    }
    async create(action) {
        const newAction = this.actionRepository.create(Object.assign({ buttons: [], reacts: [], selects: [] }, action));
        return newAction;
    }
    async findOneWithRelation(findCondition) {
        return await this.actionRepository.findOne({
            relations: this.actionRelations,
            where: findCondition,
        });
    }
    async findManyWithRelation(findCondition) {
        return this.actionRepository.find({
            relations: this.actionRelations,
            where: findCondition,
        });
    }
    async findMany(findCondition) {
        return await this.actionRepository.find({
            where: findCondition,
        });
    }
    async updateOne(updateActionDto) {
        try {
            let action = await this.findOneWithRelation({
                actionId: updateActionDto.actionId,
            });
            if (action) {
                this.actionRepository.merge(action, updateActionDto);
                return await this.save(action);
            }
            else
                throw new common_1.NotFoundException();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteOne(findCondition) {
        try {
            const action = await this.findOneWithRelation(findCondition);
            if (action) {
                const removeChildren = [];
                for (const react of action.reacts) {
                    removeChildren.push(this.reactService.deleteOne({ reactId: react.reactId }));
                }
                for (const button of action.buttons) {
                    removeChildren.push(this.buttonService.deleteOne({ buttonId: button.buttonId }));
                }
                await Promise.all(removeChildren);
                await this.actionRepository.remove(action);
            }
            return action;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
};
ActionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(action_entity_1.ActionEntity)),
    __metadata("design:paramtypes", [action_repository_1.ActionRepository,
        react_service_1.ReactService,
        button_service_1.ButtonService])
], ActionService);
exports.ActionService = ActionService;
//# sourceMappingURL=action.service.js.map