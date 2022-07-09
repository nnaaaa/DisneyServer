import { ArgumentEntity } from 'src/entities/argument.entity'
import { ArgumentRepository } from 'src/repositories/argument.repository'
import { DeepPartial, FindOptionsWhere } from 'typeorm'
export declare class ArgumentService {
    private argumentRepository
    constructor(argumentRepository: ArgumentRepository)
    save(Argument: ArgumentEntity): Promise<ArgumentEntity>
    create(createArgumentDto: DeepPartial<ArgumentEntity>): Promise<ArgumentEntity>
    updateOne(
        findCondition: FindOptionsWhere<ArgumentEntity>,
        updateCondition: DeepPartial<ArgumentEntity>
    ): Promise<ArgumentEntity>
    deleteOne(findCondition: FindOptionsWhere<ArgumentEntity>): Promise<ArgumentEntity>
    findOne(findCondition: FindOptionsWhere<ArgumentEntity>): Promise<ArgumentEntity>
}
