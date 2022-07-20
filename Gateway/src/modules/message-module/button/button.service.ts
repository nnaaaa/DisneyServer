import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ButtonEntity } from 'src/entities/button.entity'
import { ButtonRepository } from 'src/repositories/button.repository'
import { ActionDto } from 'src/shared/dtos/action.dto'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { ReactService } from '../react/react.service'
import { CreateButtonDto } from './dto/createButton.dto'
import { UpdateButtonDto } from './dto/updateButton.dto'

@Injectable()
export class ButtonService {
    public readonly buttonRelations: FindOptionsRelations<ButtonEntity> = {
        action: true,
    }

    constructor(
        @InjectRepository(ButtonEntity) private buttonRepository: ButtonRepository
    ) {}

    async save(Button: ButtonEntity) {
        return await this.buttonRepository.save(Button)
    }

    async create(createButtonDto: CreateButtonDto, action: ActionDto) {
        const newButton = this.buttonRepository.create({
            ...createButtonDto,
            action,
        })

        if (!newButton.customId) newButton.customId = createButtonDto.name

        return newButton
    }

    async findOne(findCondition: FindOptionsWhere<ButtonEntity>) {
        return await this.buttonRepository.findOne({
            where: findCondition,
        })
    }
    async findOneWithRelation(findCondition: FindOptionsWhere<ButtonEntity>) {
        return await this.buttonRepository.findOne({
            where: findCondition,
            relations: this.buttonRelations,
        })
    }

    async findMany(findCondition: FindOptionsWhere<ButtonEntity>) {
        return this.buttonRepository.find({
            where: findCondition,
        })
    }

    async updateOne(updateButtonDto: UpdateButtonDto) {
        try {
            let button = await this.findOne({
                buttonId: updateButtonDto.buttonId,
            })

            this.buttonRepository.merge(button, updateButtonDto)

            return await this.save(button)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<ButtonEntity>) {
        try {
            const button = await this.findOne(findCondition)
            if (button) {
                await this.buttonRepository.remove(button)
            }
            return button
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteMany(findCondition: FindOptionsWhere<ButtonEntity>) {
        try {
            const buttons = await this.findMany(findCondition)

            await this.buttonRepository.remove(buttons)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
