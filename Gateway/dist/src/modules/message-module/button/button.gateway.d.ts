import { Server } from 'socket.io';
import { ButtonService } from './button.service';
import { UpdateButtonDto } from './dto/updateButton.dto';
export declare class ButtonGateway {
    private buttonService;
    private readonly logger;
    server: Server;
    constructor(buttonService: ButtonService);
    click(buttonDto: UpdateButtonDto): Promise<any>;
}
