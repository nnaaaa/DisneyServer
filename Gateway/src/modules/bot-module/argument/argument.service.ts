import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArgumentEntity } from 'src/entities/argument.entity'
import { ArgumentRepository } from 'src/repositories/argument.repository'
import { DeepPartial, FindOptionsWhere } from 'typeorm'

@Injectable()
export class ArgumentService {
    constructor(
        @InjectRepository(ArgumentEntity) private argumentRepository: ArgumentRepository
    ) {}

    async save(Argument: ArgumentEntity) {
        return this.argumentRepository.save(Argument)
    }

    async create(createArgumentDto: DeepPartial<ArgumentEntity>) {
        const argument = this.argumentRepository.create(createArgumentDto)

        return argument
    }

    async updateOne(
        findCondition: FindOptionsWhere<ArgumentEntity>,
        updateCondition: DeepPartial<ArgumentEntity>
    ) {
        try {
            let argument = await this.findOne(findCondition)

            argument = Object.assign(argument, updateCondition)

            return await this.save(argument)
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<ArgumentEntity>) {
        try {
            let Argument = await this.findOne(findCondition)

            return await this.argumentRepository.remove(Argument)
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async findOne(findCondition: FindOptionsWhere<ArgumentEntity>) {
        return await this.argumentRepository.findOne({
            where: findCondition,
        })
    }
}
