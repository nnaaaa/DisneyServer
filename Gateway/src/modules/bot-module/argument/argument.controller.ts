import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common'
import { ArgumentService } from './argument.service'
import { CreateArgDto } from './dtos/createArg.dto'

@Controller('argument')
export class ArgumentController {
    constructor(private argumentService: ArgumentService) {}

    @Post('/:commandId')
    async execute(
        @Param('commandId') commandId: string,
        @Body() createArgumentDto: CreateArgDto
    ) {
        const argument = await this.argumentService.create({
            ...createArgumentDto,
            command: { commandId },
        })

        const savedArgument = await this.argumentService.save(argument)

        return savedArgument
    }

    @Put('/:argId')
    async update(@Param('argId') argId: string, @Body() updateArgumentDto: CreateArgDto) {
        const argument = await this.argumentService.updateOne(
            { argId },
            updateArgumentDto
        )

        return argument
    }

    @Delete('/:argId')
    async delete(@Param('argId') argId: string) {
        const argument = await this.argumentService.deleteOne({ argId })

        return argument
    }
}
