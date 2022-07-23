import { MemberEntity } from './member.entity';
import { ActionEntity } from './action.entity';
export declare enum ButtonStyle {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error"
}
export declare class ButtonEntity {
    buttonId: string;
    customId: string;
    name: string;
    isDisabled: boolean;
    style: ButtonStyle;
    action: ActionEntity;
    clickers: MemberEntity[];
}
