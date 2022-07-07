import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common'
import { CommandService } from './command.service'
import { CreateCommandDto } from './dtos/createCommand.dto'

@Controller('command')
export class CommandController {
    constructor(private commandService: CommandService) {}

    @Post('/:botId')
    async execute(
        @Param('botId') botId: string,
        @Body() createCommandDto: CreateCommandDto
    ) {
        const command = await this.commandService.create({
            ...createCommandDto,
            bot: { botId },
        })

        const savedCommand = await this.commandService.save(command)

        return savedCommand
    }

    @Put('/:commandId')
    async update(
        @Param('commandId') commandId: string,
        @Body() updateCommandDto: CreateCommandDto
    ) {
        const command = await this.commandService.updateOne(
            { commandId },
            updateCommandDto
        )

        return command
    }

    @Delete('/:commandId')
    async delete(@Param('commandId') commandId: string) {
        const command = await this.commandService.deleteOne({ commandId })

        return command
    }
}
