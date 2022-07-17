import { Server } from 'socket.io'
import { MessageDto } from 'src/shared/dtos'
import { ActionService } from './action.service'
export declare class ActionGateway {
    private actionService
    private readonly logger
    server: Server
    constructor(actionService: ActionService)
    create(messageOfActionDto: MessageDto): Promise<any>
}
