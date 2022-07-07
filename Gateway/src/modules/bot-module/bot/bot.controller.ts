import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'
import { BotEntity } from 'src/entities/bot.entity'
import { UserEntity } from 'src/entities/user.entity'
import { AuthService } from 'src/modules/auth-module/auth/auth.service'
import { JwtBotGuard } from 'src/modules/auth-module/auth/guards/jwtBot.guard'
import { JwtUserGuard } from 'src/modules/auth-module/auth/guards/jwtUser.guard'
import { AuthUser } from 'src/shared/decorators/auth-user.decorator'
import { BotService } from './bot.service'
import { CreateBotDto } from './dtos/createBot.dto'
import { GenSecretKeyDto } from './dtos/genSecretKey.dto'
import { UpdateBotDto } from './dtos/updateBot.dto'

@Controller('bot')
export class BotController {
    constructor(private botService: BotService, private authService: AuthService) {}

    @Get()
    @UseGuards(JwtBotGuard)
    getOne(@AuthUser() bot: BotEntity) {
        return this.botService.updateOne({ botId: bot.botId }, { isListening: true })
    }

    @Get('/fromAuthor')
    @UseGuards(JwtUserGuard)
    getFromAuthor(@AuthUser() { userId }: UserEntity) {
        return this.botService.findManyWithRelation({ author: { userId } })
    }

    @Get('/all')
    @UseGuards(JwtUserGuard)
    getAll() {
        return this.botService.findManyWithRelation({})
    }

    @Post('/genSecretKey')
    @UseGuards(JwtUserGuard)
    async generateSecretKey(@Body() genSecretKeyDto: GenSecretKeyDto) {
        const key = await this.botService.genSecretKey(genSecretKeyDto)

        return key
    }

    @Post()
    @UseGuards(JwtUserGuard)
    async create(@Body() createBotDto: CreateBotDto, @AuthUser() user: UserEntity) {
        const bot = await this.botService.create(createBotDto)

        bot.author = user

        const savedBot = await this.botService.save(bot)

        return savedBot
    }

    @Put()
    @UseGuards(JwtUserGuard)
    async update(@Body() updateBotDto: UpdateBotDto) {
        const bot = await this.botService.updateOne(
            { botId: updateBotDto.botId },
            updateBotDto
        )

        return bot
    }

    @Delete('/:id')
    @UseGuards(JwtUserGuard)
    async delete(@Param('id') botId: string, @AuthUser() { userId }: UserEntity) {
        const bot = await this.botService.deleteOne({ botId, author: { userId } })

        return bot
    }
}
