import { Server } from 'socket.io'
import { EmojiDto } from 'src/shared/dtos'
import { CreateReactDto } from './dtos/createReact.dto'
import { ReactService } from './react.service'
export declare class ReactGateway {
    private reactService
    private readonly logger
    server: Server
    constructor(reactService: ReactService)
    create(createReactDto: CreateReactDto): Promise<any>
    update(reactId: string, emojiOfReactDto: EmojiDto): Promise<any>
    delete(reactId: string): Promise<any>
}
