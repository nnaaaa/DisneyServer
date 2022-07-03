import { Server } from 'socket.io';
import { EmojiDto, MemberDto, MessageDto } from 'src/shared/dtos';
import { ReactService } from './react.service';
export declare class ReactGateway {
    private reactService;
    private readonly logger;
    server: Server;
    constructor(reactService: ReactService);
    create(emojiOfReactDto: EmojiDto, messageOfReactDto: MessageDto, authorOfReactDto: MemberDto): Promise<void>;
    update(reactId: string, emojiOfReactDto: EmojiDto): Promise<void>;
    delete(reactId: string): Promise<void>;
}
