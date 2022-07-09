import { ArgumentEntity } from './argument.entity'
import { BotEntity } from './bot.entity'
export declare class CommandEntity {
    commandId: string
    name: string
    description: string
    bot: BotEntity
    args: ArgumentEntity[]
}
