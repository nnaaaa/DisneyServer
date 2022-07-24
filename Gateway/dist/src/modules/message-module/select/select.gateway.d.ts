import { Server } from 'socket.io';
import { UpdateOptionDto } from './dtos/updateOption.dto';
import { SelectService } from './select.service';
export declare class SelectGateway {
    private selectService;
    private readonly logger;
    server: Server;
    constructor(selectService: SelectService);
    select(optionDto: UpdateOptionDto): Promise<any>;
}
