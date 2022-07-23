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
exports.SelectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const option_entity_1 = require("../../../entities/option.entity");
const select_entity_1 = require("../../../entities/select.entity");
const option_repository_1 = require("../../../repositories/option.repository");
const select_repository_1 = require("../../../repositories/select.repository");
let SelectService = class SelectService {
    constructor(selectRepository, optionRepository) {
        this.selectRepository = selectRepository;
        this.optionRepository = optionRepository;
    }
    async save(select) {
        return await this.selectRepository.save(select);
    }
    async create(createSelectDto, action) {
        const newSelect = this.selectRepository.create(Object.assign(Object.assign({}, createSelectDto), { options: [], action }));
        const savedSelect = await this.save(newSelect);
        for (const option of createSelectDto.options) {
            const newOption = this.optionRepository.create(Object.assign(Object.assign({}, option), { select: savedSelect }));
            savedSelect.options.push(newOption);
        }
        return this.save(savedSelect);
    }
};
SelectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(select_entity_1.SelectEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(option_entity_1.OptionEntity)),
    __metadata("design:paramtypes", [select_repository_1.SelectRepository,
        option_repository_1.OptionRepository])
], SelectService);
exports.SelectService = SelectService;
//# sourceMappingURL=select.service.js.map