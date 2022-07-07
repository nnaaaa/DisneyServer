import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BotEntity } from 'src/entities/bot.entity'
import { CommandEntity } from 'src/entities/command.entity'
import { CommandRepository } from 'src/repositories/command.repository'
import { DeepPartial, FindOptionsWhere } from 'typeorm'

@Injectable()
export class CommandService {
    constructor(
        @InjectRepository(CommandEntity) private commandRepository: CommandRepository
    ) {}

    async save(command: CommandEntity) {
        return this.commandRepository.save(command)
    }

    async create(createCommandDto: DeepPartial<CommandEntity>) {
        const isExistCommand = await this.findOne({ name: createCommandDto.name })

        if (isExistCommand) {
            throw new ConflictException()
        }

        const command = this.commandRepository.create(createCommandDto)

        return command
    }

    async updateOne(
        findCondition: FindOptionsWhere<CommandEntity>,
        updateCondition: DeepPartial<CommandEntity>
    ) {
        try {
            let command = await this.findOne(findCondition)

            const isExistCommand = await this.findOne({ name: updateCondition.name })

            if (isExistCommand && isExistCommand.commandId !== command.commandId) {
                throw new ConflictException()
            }

            command = Object.assign(command, updateCondition)

            return await this.save(command)
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<CommandEntity>) {
        try {
            let command = await this.findOne(findCondition)

            return await this.commandRepository.remove(command)
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async findOne(findCondition: FindOptionsWhere<BotEntity>) {
        return await this.commandRepository.findOne({
            where: findCondition,
        })
    }
}
