import { ArgumentService } from './argument.service'
import { CreateArgDto } from './dtos/createArg.dto'
export declare class ArgumentController {
    private argumentService
    constructor(argumentService: ArgumentService)
    execute(
        commandId: string,
        createArgumentDto: CreateArgDto
    ): Promise<import('../../../entities/argument.entity').ArgumentEntity>
    update(
        argId: string,
        updateArgumentDto: CreateArgDto
    ): Promise<import('../../../entities/argument.entity').ArgumentEntity>
    delete(
        argId: string
    ): Promise<import('../../../entities/argument.entity').ArgumentEntity>
}
