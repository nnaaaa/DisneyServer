import { CreateActionDto } from '../../action/dtos/createAction.dto';
export declare class CreateMessageDto {
    content: string;
    images: string[];
    action: CreateActionDto;
}
