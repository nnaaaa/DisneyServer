import { ActionEntity } from "./action.entity";
import { OptionEntity } from "./option.entity";
export declare enum SelectStyle {
    PRIMARY = "primary",
    SECONDARY = "secondary"
}
export declare class SelectEntity {
    selectId: string;
    isDisabled: boolean;
    customId: string;
    style: SelectStyle;
    action: ActionEntity;
    options: OptionEntity[];
}
