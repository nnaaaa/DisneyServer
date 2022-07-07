import { CommandService } from './command.service'
import { CreateCommandDto } from './dtos/createCommand.dto'
export declare class CommandController {
    private commandService
    constructor(commandService: CommandService)
    execute(
        botId: string,
        createCommandDto: CreateCommandDto
    ): Promise<import('../../../entities/command.entity').CommandEntity>
    update(
        commandId: string,
        updateCommandDto: CreateCommandDto
    ): Promise<import('../../../entities/command.entity').CommandEntity>
    delete(
        commandId: string
    ): Promise<import('../../../entities/command.entity').CommandEntity>
}
