import {
    Body,
    CacheInterceptor,
    Controller,
    Delete,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtUserGuard } from 'src/modules/auth-module/auth/guards/jwtUser.guard'
import { CommandService } from './command.service'
import { CreateCommandDto } from './dtos/createCommand.dto'
import { UpdateCommandDto } from './dtos/updateCommand.dto'

@ApiTags('command')
@UseInterceptors(CacheInterceptor)
@Controller('command')
export class CommandController {
    constructor(private commandService: CommandService) {}

    @Post('/:botId')
    @UseGuards(JwtUserGuard)
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
    @UseGuards(JwtUserGuard)
    async update(
        @Param('commandId') commandId: string,
        @Body() updateCommandDto: UpdateCommandDto
    ) {
        const command = await this.commandService.updateOne(
            { commandId },
            updateCommandDto
        )

        return command
    }

    @Delete('/:commandId')
    @UseGuards(JwtUserGuard)
    async delete(@Param('commandId') commandId: string) {
        const command = await this.commandService.deleteOne({ commandId })

        return command
    }
}
