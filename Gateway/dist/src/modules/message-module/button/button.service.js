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
exports.ButtonService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Button_entity_1 = require("../../../entities/Button.entity");
const Button_repository_1 = require("../../../repositories/Button.repository");
let ButtonService = class ButtonService {
    constructor(buttonRepository) {
        this.buttonRepository = buttonRepository;
        this.buttonRelations = {
            action: true,
        };
    }
    async save(Button) {
        return await this.buttonRepository.save(Button);
    }
    async create(createButtonDto, action) {
        const newButton = this.buttonRepository.create(Object.assign(Object.assign({}, createButtonDto), { action }));
        return newButton;
    }
    async findOne(findCondition) {
        return await this.buttonRepository.findOne({
            where: findCondition,
        });
    }
    async findOneWithRelation(findCondition) {
        return await this.buttonRepository.findOne({
            where: findCondition,
            relations: this.buttonRelations,
        });
    }
    async findMany(findCondition) {
        return this.buttonRepository.find({
            where: findCondition,
        });
    }
    async updateOne(updateButtonDto) {
        try {
            let button = await this.findOne({
                buttonId: updateButtonDto.buttonId,
            });
            this.buttonRepository.merge(button, updateButtonDto);
            return await this.save(button);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteOne(findCondition) {
        try {
            const button = await this.findOne(findCondition);
            if (button) {
                await this.buttonRepository.remove(button);
            }
            return button;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteMany(findCondition) {
        try {
            const buttons = await this.findMany(findCondition);
            await this.buttonRepository.remove(buttons);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
};
ButtonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Button_entity_1.ButtonEntity)),
    __metadata("design:paramtypes", [Button_repository_1.ButtonRepository])
], ButtonService);
exports.ButtonService = ButtonService;
//# sourceMappingURL=button.service.js.map