import { MessageDto } from 'src/shared/dtos';
import { CreateButtonDto } from '../../button/dto/createButton.dto';
import { CreateReactDto } from '../../react/dtos/createReact.dto';
import { CreateSelectDto } from '../../select/dtos/createSelect.dto';
export declare class CreateActionDto {
    message: MessageDto;
    buttons: CreateButtonDto[];
    reacts: CreateReactDto[];
    selects: CreateSelectDto[];
}
