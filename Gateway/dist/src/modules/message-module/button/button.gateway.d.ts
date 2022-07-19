import { Server } from 'socket.io'
import { ActionDto } from 'src/shared/dtos/action.dto'
import { ButtonService } from './button.service'
import { CreateButtonDto } from './dto/createButton.dto'
import { UpdateButtonDto } from './dto/updateButton.dto'
export declare class ButtonGateway {
    private buttonService
    private readonly logger
    server: Server
    constructor(buttonService: ButtonService)
    create(actionOfButton: ActionDto, buttonOfButtonDto: CreateButtonDto): Promise<any>
    update(updateButtonDto: UpdateButtonDto): Promise<any>
    delete(buttonId: string): Promise<any>
    click(buttonDto: UpdateButtonDto): Promise<any>
}
