import { CommandEntity } from 'src/entities/command.entity'
import { CommandRepository } from 'src/repositories/command.repository'
import { DeepPartial, FindOptionsWhere } from 'typeorm'
export declare class CommandService {
    private commandRepository
    constructor(commandRepository: CommandRepository)
    save(command: CommandEntity): Promise<CommandEntity>
    create(createCommandDto: DeepPartial<CommandEntity>): Promise<CommandEntity>
    updateOne(
        findCondition: FindOptionsWhere<CommandEntity>,
        updateCondition: DeepPartial<CommandEntity>
    ): Promise<CommandEntity>
    deleteOne(findCondition: FindOptionsWhere<CommandEntity>): Promise<CommandEntity>
    findOne(findCondition: FindOptionsWhere<CommandEntity>): Promise<CommandEntity>
}
