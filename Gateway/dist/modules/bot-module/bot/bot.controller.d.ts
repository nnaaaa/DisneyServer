import { BotEntity } from 'src/entities/bot.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/modules/auth-module/auth/auth.service';
import { BotService } from './bot.service';
import { CreateBotDto } from './dtos/createBot.dto';
import { GenSecretKeyDto } from './dtos/genSecretKey.dto';
import { UpdateBotDto } from './dtos/updateBot.dto';
export declare class BotController {
    private botService;
    private authService;
    constructor(botService: BotService, authService: AuthService);
    getOne(bot: BotEntity): Promise<BotEntity>;
    getFromAuthor({ userId }: UserEntity): Promise<BotEntity[]>;
    getAll(): Promise<BotEntity[]>;
    generateSecretKey(genSecretKeyDto: GenSecretKeyDto): Promise<string>;
    create(createBotDto: CreateBotDto, user: UserEntity): Promise<BotEntity>;
    update(updateBotDto: UpdateBotDto): Promise<BotEntity>;
    delete(botId: string, { userId }: UserEntity): Promise<BotEntity>;
}
