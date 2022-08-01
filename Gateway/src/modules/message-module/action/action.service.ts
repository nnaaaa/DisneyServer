import { SelectService } from './../select/select.service'
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ActionEntity } from 'src/entities/action.entity'
import { ActionRepository } from 'src/repositories/action.repository'
import { DeepPartial, FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { ButtonService } from '../button/button.service'
import { ReactService } from '../react/react.service'

@Injectable()
export class ActionService {
    public readonly actionRelations: FindOptionsRelations<ActionEntity> = {
        buttons: true,
        reacts: true,
        selects: true,
    }

    constructor(
        @InjectRepository(ActionEntity) private actionRepository: ActionRepository,
        private reactService: ReactService,
        private buttonService: ButtonService,
        private selectService: SelectService
    ) {}

    async save(action: ActionEntity) {
        return await this.actionRepository.save(action)
    }

    async create(action: DeepPartial<ActionEntity>) {
        const newAction = this.actionRepository.create({
            buttons: [],
            reacts: [],
            selects: [],
            ...action,
        })

        return newAction
    }

    async findOneWithRelation(findCondition: FindOptionsWhere<ActionEntity>) {
        return await this.actionRepository.findOne({
            relations: this.actionRelations,
            where: findCondition,
        })
    }
    async findManyWithRelation(findCondition: FindOptionsWhere<ActionEntity>) {
        return this.actionRepository.find({
            relations: this.actionRelations,
            where: findCondition,
        })
    }
    async findMany(findCondition: FindOptionsWhere<ActionEntity>) {
        return await this.actionRepository.find({
            where: findCondition,
        })
    }

    async updateOne(updateActionDto: DeepPartial<ActionEntity>) {
        try {
            let action = await this.findOneWithRelation({
                actionId: updateActionDto.actionId,
            })
            if (action) {
                this.actionRepository.merge(action, updateActionDto)
                return await this.save(action)
            } else throw new NotFoundException()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<ActionEntity>) {
        try {
            const action = await this.findOneWithRelation(findCondition)
            if (action) {
                const removeChildren = []
                for (const react of action.reacts) {
                    removeChildren.push(
                        this.reactService.deleteOne({ reactId: react.reactId })
                    )
                }
                for (const button of action.buttons) {
                    removeChildren.push(
                        this.buttonService.deleteOne({ buttonId: button.buttonId })
                    )
                }
                for (const select of action.selects) {
                    removeChildren.push(
                        this.selectService.deleteOne({ selectId: select.selectId })
                    )
                }
                await Promise.all(removeChildren)

                await this.actionRepository.remove(action)
            }
            return action
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    // async deleteMany(findCondition: FindOptionsWhere<ActionEntity>) {
    //     try {
    //         const actions = await this.findMany(findCondition)

    //         const removeChildren = []
    //         for (const action of actions) {
    //             removeChildren.push(
    //                 this.reactService.deleteMany({
    //                     action: { actionId: action.actionId },
    //                 })
    //             )
    //             removeChildren.push(
    //                 this.buttonService.deleteMany({
    //                     action: { actionId: action.actionId },
    //                 })
    //             )
    //         }
    //         await Promise.all(removeChildren)

    //         await this.actionRepository.remove(actions)
    //     } catch (e) {
    //         throw new InternalServerErrorException(e)
    //     }
    // }
}
