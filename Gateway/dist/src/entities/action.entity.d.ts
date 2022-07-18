import { ButtonEntity } from './button.entity';
import { MessageEntity } from './message.entity';
import { ReactEntity } from './react.entity';
export declare class ActionEntity {
    actionId: string;
    reacts: ReactEntity[];
    buttons: ButtonEntity[];
    message: MessageEntity;
}
