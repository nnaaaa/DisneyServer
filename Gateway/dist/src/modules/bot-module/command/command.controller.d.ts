import { CommandService } from './command.service'
import { CreateCommandDto } from './dtos/createCommand.dto'
import { UpdateCommandDto } from './dtos/updateCommand.dto'
export declare class CommandController {
    private commandService
    constructor(commandService: CommandService)
    execute(
        botId: string,
        createCommandDto: CreateCommandDto
    ): Promise<import('../../../entities/command.entity').CommandEntity>
    update(
        commandId: string,
        updateCommandDto: UpdateCommandDto
    ): Promise<import('../../../entities/command.entity').CommandEntity>
    delete(
        commandId: string
    ): Promise<import('../../../entities/command.entity').CommandEntity>
}
