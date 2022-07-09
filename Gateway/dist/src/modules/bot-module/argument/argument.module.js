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
Object.defineProperty(exports, '__esModule', { value: true })
exports.ArgumentModule = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const argument_entity_1 = require('../../../entities/argument.entity')
const argument_controller_1 = require('./argument.controller')
const argument_service_1 = require('./argument.service')
let ArgumentModule = class ArgumentModule {}
ArgumentModule = __decorate(
    [
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([argument_entity_1.ArgumentEntity]),
            ],
            controllers: [argument_controller_1.ArgumentController],
            providers: [argument_service_1.ArgumentService],
        }),
    ],
    ArgumentModule
)
exports.ArgumentModule = ArgumentModule
//# sourceMappingURL=argument.module.js.map
