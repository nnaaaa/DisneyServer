import {
    Body,
    CacheInterceptor,
    Controller,
    Delete,
    Param,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommandService } from './command.service'
import { CreateCommandDto } from './dtos/createCommand.dto'

@ApiTags('command')
@UseInterceptors(CacheInterceptor)
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
